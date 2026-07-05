export default function ProductSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden" style={{ minHeight: "520px" }}>
      <div className="h-60 bg-slate-100 animate-pulse" />
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div className="h-5 w-20 bg-slate-100 rounded-full animate-pulse" />
        <div className="h-4 w-full bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-4 w-3/4 bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-3 w-24 bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-3 w-full bg-slate-100 rounded-lg animate-pulse" />
        <div className="h-3 w-5/6 bg-slate-100 rounded-lg animate-pulse" />
        <div className="mt-auto space-y-2">
          <div className="h-7 w-32 bg-slate-100 rounded-lg animate-pulse" />
          <div className="h-10 w-full bg-slate-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
