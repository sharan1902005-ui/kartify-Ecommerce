import { useCallback, useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySidebar from "../components/CategorySidebar";
import ProductCard from "../components/ProductCard";
import { ProductSkeletonGrid } from "../components/ProductSkeleton";
import Pagination from "../components/Pagination";
import { EmptySearch } from "../components/EmptyState";

const PRODUCTS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: "newest",     label: "Newest First" },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "alpha",      label: "A → Z" },
];

const STORE_CATEGORIES = [
  "All Products", "Electronics", "Fashion", "Home & Kitchen",
  "Beauty", "Books", "Sports", "Accessories", "Groceries",
];

function getPrimaryCategory(category = "") {
  const raw = String(category).trim();
  if (!raw) return "Accessories";
  if (STORE_CATEGORIES.includes(raw)) return raw;

  const normalized = raw.toLowerCase();
  const firstPart = raw.split(/[>|-]/)[0].trim();
  const compact = firstPart.replace(/\s+/g, "");

  if (/book|notebook|journal|diary|pen|pencil|office|paper|calculator/.test(normalized)) return "Books";
  if (/fashion|watch|wearable|sunglass|bag|wallet|strap|band|lifestyle/.test(normalized)) return "Fashion";
  if (/beauty|skin|hair|face|cream|serum|soap|shampoo|makeup|trimmer|groom|personal care/.test(normalized)) return "Beauty";
  if (/sport|fitness|yoga|gym|cycle|ball|cricket|football|badminton|exercise|active/.test(normalized)) return "Sports";
  if (/grocery|food|tea|coffee|snack|cereal|honey|oil|masala|rice|sugar|daily essential/.test(normalized)) return "Groceries";
  if (/home|kitchen|cook|mixer|grinder|bottle|container|pan|stove|lamp|fan|heater|furniture|bath/.test(normalized)) return "Home & Kitchen";
  if (/cable|charger|adapter|case|cover|mouse|keyboard|stand|holder|hub|sleeve|screen|pendrive|hard disk|ssd|earphone|earbuds|headphone|speaker|soundbar|hdmi|accessor/.test(normalized)) return "Accessories";

  const map = {
    Electronics: "Electronics", Fashion: "Fashion", Beauty: "Beauty",
    Books: "Books", Sports: "Sports", Accessories: "Accessories",
    Groceries: "Groceries", ComputersAccessories: "Accessories",
    "Computers&Accessories": "Accessories", HomeKitchen: "Home & Kitchen",
    "Home&Kitchen": "Home & Kitchen", OfficeProducts: "Books",
    MusicalInstruments: "Accessories", HomeImprovement: "Home & Kitchen",
  };
  return map[compact] || map[firstPart] || "Electronics";
}

export default function Products() {
  const [products, setProducts]               = useState([]);
  const [loading, setLoading]                 = useState(true);
  const [searchTerm, setSearchTerm]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy]                   = useState("newest");
  const [currentPage, setCurrentPage]         = useState(1);
  const [cartCount, setCartCount]             = useState(0);

  // ── Existing API call — untouched ──────────────────────────────────────────
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // ── Existing addToCart — untouched ─────────────────────────────────────────
  const addToCart = async (product) => {
    try {
      await api.post("/cart/add", {
        userId: 1,
        productId: product.id,
        quantity: 1,
      });
      setCartCount((c) => c + 1);
      window.location.href = "/cart";
    } catch (error) {
      console.log(error);
      alert("Add to cart failed");
    }
  };

  // ── Client-side category counts ────────────────────────────────────────────
  const productCounts = useMemo(() => {
    const counts = { "All Products": products.length };
    products.forEach((p) => {
      const cat = getPrimaryCategory(p.category);
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [products]);

  // ── Client-side filter + sort ──────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return products
      .filter((p) => {
        const cat = getPrimaryCategory(p.category);
        const matchesCat = selectedCategory === "All Products" || cat === selectedCategory;
        const searchable = [p.name, p.category, p.description].join(" ").toLowerCase();
        return matchesCat && (!query || searchable.includes(query));
      })
      .sort((a, b) => {
        if (sortBy === "price-asc")  return Number(a.price) - Number(b.price);
        if (sortBy === "price-desc") return Number(b.price) - Number(a.price);
        if (sortBy === "alpha")      return a.name.localeCompare(b.name);
        return Number(b.id ?? 0) - Number(a.id ?? 0);
      });
  }, [products, searchTerm, selectedCategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage   = Math.min(currentPage, totalPages);

  const paginatedProducts = useMemo(() => {
    const start = (safePage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [filteredProducts, safePage]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Products");
    setSortBy("newest");
    setCurrentPage(1);
  };

  const handleSearch = (val) => { setSearchTerm(val); setCurrentPage(1); };
  const handleCategory = (cat) => { setSelectedCategory(cat); setCurrentPage(1); };
  const handleSort = (val) => { setSortBy(val); setCurrentPage(1); };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar
        cartCount={cartCount}
        onSearch={handleSearch}
        onCategorySelect={handleCategory}
        selectedCategory={selectedCategory}
      />

      <Hero
        productCount={products.length}
        onShopNow={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
        onExplore={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}
      />

      {/* Catalog */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <CategorySidebar
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategory}
            productCounts={productCounts}
          />

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl font-black text-slate-800">
                  {selectedCategory === "All Products" ? "All Products" : selectedCategory}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {loading ? "Loading…" : `${filteredProducts.length} products found`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-white border border-slate-200 rounded-xl px-3 py-2">
                  <SlidersHorizontal size={13} />
                  Sort by
                </div>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="appearance-none h-9 pl-3 pr-8 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-teal-100 cursor-pointer transition-all"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active filters */}
            {(searchTerm || selectedCategory !== "All Products") && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap items-center gap-2 mb-5"
              >
                <span className="text-xs text-slate-500 font-medium">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1.5 bg-teal-50 text-[#0F766E] text-xs font-semibold px-3 py-1 rounded-full border border-teal-100">
                    "{searchTerm}"
                    <button onClick={() => handleSearch("")} className="hover:text-red-500 transition-colors">×</button>
                  </span>
                )}
                {selectedCategory !== "All Products" && (
                  <span className="inline-flex items-center gap-1.5 bg-teal-50 text-[#0F766E] text-xs font-semibold px-3 py-1 rounded-full border border-teal-100">
                    {selectedCategory}
                    <button onClick={() => handleCategory("All Products")} className="hover:text-red-500 transition-colors">×</button>
                  </span>
                )}
                <button onClick={resetFilters} className="text-xs text-slate-400 hover:text-red-500 underline transition-colors">
                  Clear all
                </button>
              </motion.div>
            )}

            {/* Grid */}
            {loading ? (
              <ProductSkeletonGrid />
            ) : filteredProducts.length === 0 ? (
              <EmptySearch onReset={resetFilters} />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                  {paginatedProducts.map((product, i) => (
                    <ProductCard
                      key={product.id ?? product.name}
                      product={product}
                      onAddToCart={addToCart}
                      index={i}
                    />
                  ))}
                </div>
                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center text-sm py-8 mt-16">
        <p className="font-semibold text-white mb-1">Kartify</p>
        <p>© {new Date().getFullYear()} Kartify Commerce. All rights reserved.</p>
      </footer>
    </div>
  );
}
