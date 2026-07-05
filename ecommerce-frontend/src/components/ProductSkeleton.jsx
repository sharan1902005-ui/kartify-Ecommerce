function Shimmer({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-slate-100 rounded-lg ${className}`}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
        }}
      />
    </div>
  );
}

export default function ProductSkeleton() {
  return (
    <div
      className="flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden"
      style={{ minHeight: "520px" }}
    >
      {/* Image area */}
      <Shimmer className="h-56 rounded-none" />

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category pill */}
        <Shimmer className="h-5 w-20 rounded-full" />
        {/* Name */}
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-3/4" />
        {/* Brand */}
        <Shimmer className="h-3 w-1/3" />
        {/* Stars */}
        <Shimmer className="h-3 w-28" />

        <div className="mt-auto space-y-3">
          {/* Price */}
          <div className="flex items-center gap-3">
            <Shimmer className="h-7 w-24" />
            <Shimmer className="h-4 w-16" />
          </div>
          {/* Stock */}
          <Shimmer className="h-3 w-20" />
          {/* Button */}
          <Shimmer className="h-10 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 8 }) {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {Array.from({ length: count }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    </>
  );
}
