/* global process */
/**
 * Lumora product image audit
 *
 * Read-only by default. Scans product image URLs and writes:
 * - reports/dead-images.json: [{ id, name, imageUrl, status }]
 * - reports/image-audit-summary.json: totals and timestamp
 *
 * Usage:
 *   npm run check-images
 *   npm run check-images -- --source=api --api-url=http://localhost:8080/api/products
 *   npm run check-images -- --source=json --file=./exports/products.json
 *   npm run check-images -- --source=csv --file=D:/THIRAN/amazon.csv
 *
 * Optional cleanup export, still does not touch the live database:
 *   npm run check-images -- --source=json --file=./products.json --fix --fix-mode=nullify
 *   npm run check-images -- --source=json --file=./products.json --fix --fix-mode=remove
 *
 * Defaults:
 * - source: api
 * - api-url: http://localhost:5000/products
 * - dry-run: true
 * - fix-mode: nullify
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_API_URL = "http://localhost:5000/products";
const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_CONCURRENCY = 18;
const REPORTS_DIR = "reports";

main().catch((error) => {
  console.error("Image audit failed:", error.message);
  process.exitCode = 1;
});

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const products = await loadProducts(options);

  if (!products.length) {
    throw new Error("No products found for the selected source.");
  }

  console.log(`Loaded ${products.length} products from ${options.source}.`);
  console.log(
    `Checking images with concurrency=${options.concurrency}, timeout=${options.timeoutMs}ms...`
  );

  const checked = [];
  let completed = 0;
  let deadCount = 0;

  await runWithConcurrency(products, options.concurrency, async (product) => {
    const result = await auditProductImage(product, options.timeoutMs);
    checked.push(result);
    completed += 1;
    if (!result.ok) deadCount += 1;

    if (completed % 100 === 0 || completed === products.length) {
      console.log(`Checked ${completed}/${products.length}... ${deadCount} dead so far`);
    }
  });

  checked.sort((a, b) => a.index - b.index);

  const deadImages = checked
    .filter((result) => !result.ok)
    .map(({ id, name, imageUrl, status }) => ({ id, name, imageUrl, status }));

  const summary = {
    totalChecked: checked.length,
    totalOk: checked.length - deadImages.length,
    totalDead: deadImages.length,
    deadPercentage: Number(((deadImages.length / checked.length) * 100).toFixed(2)),
    checkedAt: new Date().toISOString(),
  };

  await mkdir(REPORTS_DIR, { recursive: true });
  await writeJson(path.join(REPORTS_DIR, "dead-images.json"), deadImages);
  await writeJson(path.join(REPORTS_DIR, "image-audit-summary.json"), summary);

  if (!options.dryRun) {
    const cleanedProducts = buildCleanedProducts(products, deadImages, options.fixMode);
    await writeJson(path.join(REPORTS_DIR, "products-cleaned.json"), cleanedProducts);
    console.log(
      `Fix export written with mode=${options.fixMode}: ${path.join(
        REPORTS_DIR,
        "products-cleaned.json"
      )}`
    );
  }

  console.log("Image audit complete.");
  console.log(summary);
}

function parseArgs(args) {
  const options = {
    source: "api",
    file: "",
    apiUrl: DEFAULT_API_URL,
    dryRun: true,
    fixMode: "nullify",
    timeoutMs: DEFAULT_TIMEOUT_MS,
    concurrency: DEFAULT_CONCURRENCY,
  };

  for (const arg of args) {
    const [flag, rawValue] = arg.split("=");
    const value = rawValue ?? "";

    if (flag === "--source") options.source = value.toLowerCase();
    if (flag === "--file") options.file = value;
    if (flag === "--api-url") options.apiUrl = value;
    if (flag === "--dry-run") options.dryRun = value === "" || value !== "false";
    if (flag === "--fix") options.dryRun = false;
    if (flag === "--fix-mode") options.fixMode = value.toLowerCase();
    if (flag === "--timeout-ms") options.timeoutMs = Number(value);
    if (flag === "--concurrency") options.concurrency = Number(value);
  }

  if (!["api", "json", "csv"].includes(options.source)) {
    throw new Error("--source must be one of: api, json, csv");
  }

  if (["json", "csv"].includes(options.source) && !options.file) {
    throw new Error("--file is required when --source is json or csv");
  }

  if (!["remove", "nullify"].includes(options.fixMode)) {
    throw new Error("--fix-mode must be remove or nullify");
  }

  if (!Number.isFinite(options.timeoutMs) || options.timeoutMs <= 0) {
    throw new Error("--timeout-ms must be a positive number");
  }

  if (!Number.isFinite(options.concurrency) || options.concurrency < 1) {
    throw new Error("--concurrency must be a positive number");
  }

  options.concurrency = Math.min(Math.floor(options.concurrency), 20);

  return options;
}

async function loadProducts(options) {
  if (options.source === "api") return loadProductsFromApi(options.apiUrl);
  if (options.source === "json") return loadProductsFromJson(options.file);
  return loadProductsFromCsv(options.file);
}

async function loadProductsFromApi(apiUrl) {
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`API request failed with HTTP ${response.status}`);
  }

  const payload = await response.json();
  const products = Array.isArray(payload) ? payload : payload.products;

  if (!Array.isArray(products)) {
    throw new Error("API response must be an array or an object with a products array.");
  }

  return normalizeProducts(products);
}

async function loadProductsFromJson(filePath) {
  const raw = stripBom(await readFile(filePath, "utf8"));
  const payload = JSON.parse(raw);
  const products = Array.isArray(payload) ? payload : payload.products;

  if (!Array.isArray(products)) {
    throw new Error("JSON file must contain an array or an object with a products array.");
  }

  return normalizeProducts(products);
}

async function loadProductsFromCsv(filePath) {
  const raw = stripBom(await readFile(filePath, "utf8"));
  const rows = parseCsv(raw);
  return normalizeProducts(rows);
}

function normalizeProducts(products) {
  return products
    .map((product, index) => ({
      ...product,
      index,
      id: product.id ?? product.productId ?? product.product_id ?? index + 1,
      name: product.name ?? product.productName ?? product.product_name ?? "",
      imageUrl: product.imageUrl ?? product.image_url ?? product.img_link ?? "",
    }))
    .filter((product) => product.name || product.imageUrl);
}

async function auditProductImage(product, timeoutMs) {
  const baseResult = {
    index: product.index,
    id: product.id,
    name: product.name,
    imageUrl: product.imageUrl,
    status: "MISSING_URL",
    ok: false,
  };

  if (!product.imageUrl) return baseResult;

  let lastResult = baseResult;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    lastResult = await checkImageUrl(product.imageUrl, timeoutMs);
    if (lastResult.ok) break;
  }

  return {
    ...baseResult,
    status: lastResult.status,
    ok: lastResult.ok,
  };
}

async function checkImageUrl(imageUrl, timeoutMs) {
  const headResult = await requestImage(imageUrl, "HEAD", timeoutMs);

  if (headResult.ok) return headResult;
  if (!["405", "501", "NETWORK_ERROR"].includes(String(headResult.status))) {
    return headResult;
  }

  return requestImage(imageUrl, "GET", timeoutMs, { Range: "bytes=0-0" });
}

async function requestImage(imageUrl, method, timeoutMs, headers = {}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(imageUrl, {
      method,
      headers,
      signal: controller.signal,
      redirect: "follow",
    });

    return {
      status: String(response.status),
      ok: response.status >= 200 && response.status < 400,
    };
  } catch (error) {
    return {
      status: error.name === "AbortError" ? "TIMEOUT" : "NETWORK_ERROR",
      ok: false,
    };
  } finally {
    clearTimeout(timeoutId);
  }
}

async function runWithConcurrency(items, concurrency, worker) {
  let nextIndex = 0;

  async function runNext() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex;
      nextIndex += 1;
      await worker(items[currentIndex]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => runNext())
  );
}

function buildCleanedProducts(products, deadImages, fixMode) {
  const deadIds = new Set(deadImages.map((product) => String(product.id)));
  const deadUrls = new Set(deadImages.map((product) => product.imageUrl));

  if (fixMode === "remove") {
    return products.filter(
      (product) => !deadIds.has(String(product.id)) && !deadUrls.has(product.imageUrl)
    );
  }

  return products.map((product) => {
    if (!deadIds.has(String(product.id)) && !deadUrls.has(product.imageUrl)) {
      return product;
    }

    return {
      ...product,
      imageUrl: null,
      image_url: product.image_url === undefined ? undefined : null,
      img_link: product.img_link === undefined ? undefined : null,
    };
  });
}

async function writeJson(filePath, payload) {
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

function parseCsv(raw) {
  const rows = [];
  const records = [];
  let field = "";
  let record = [];
  let inQuotes = false;

  for (let index = 0; index < raw.length; index += 1) {
    const char = raw[index];
    const nextChar = raw[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      record.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") index += 1;
      record.push(field);
      records.push(record);
      field = "";
      record = [];
      continue;
    }

    field += char;
  }

  if (field || record.length) {
    record.push(field);
    records.push(record);
  }

  if (!records.length) return rows;

  const headers = records[0].map((header) => header.trim().replace(/^\uFEFF/, ""));

  for (const values of records.slice(1)) {
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });

    const hasAnyValue = Object.values(row).some((value) => String(value).trim());
    if (hasAnyValue) rows.push(row);
  }

  return rows;
}

function stripBom(value) {
  return value.replace(/^\uFEFF/, "");
}
