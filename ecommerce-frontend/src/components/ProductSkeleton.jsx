function Shimmer({ className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]"
        style={{ background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.75) 50%, transparent 100%)" }}
      />
    </div>
  );
}

export default function ProductSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-3xl overflow-hidden"
      style={{ minHeight: "460px", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
      {/* Image */}
      <Shimmer className="h-56 rounded-none" />
      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <Shimmer className="h-5 w-20 rounded-full" />
        <Shimmer className="h-4 w-full rounded-lg" />
        <Shimmer className="h-4 w-3/4 rounded-lg" />
        <Shimmer className="h-3 w-1/3 rounded-full" />
        <Shimmer className="h-3 w-28 rounded-full" />
        <div className="mt-auto space-y-3">
          <div className="flex items-center gap-3">
            <Shimmer className="h-7 w-24 rounded-xl" />
            <Shimmer className="h-4 w-16 rounded-lg" />
          </div>
          <Shimmer className="h-5 w-20 rounded-full" />
          <Shimmer className="h-10 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 8 }) {
  return (
    <>
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {Array.from({ length: count }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
