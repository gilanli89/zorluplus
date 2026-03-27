export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-square skeleton-shimmer" />
      {/* Info skeleton */}
      <div className="p-3.5 flex flex-col gap-2">
        <div className="h-3 w-16 skeleton-shimmer rounded" />
        <div className="h-4 w-full skeleton-shimmer rounded" />
        <div className="h-4 w-3/4 skeleton-shimmer rounded" />
        <div className="h-5 w-20 skeleton-shimmer rounded mt-1" />
      </div>
      {/* Button skeleton */}
      <div className="mx-3.5 mb-3.5 flex gap-2">
        <div className="flex-1 h-9 skeleton-shimmer rounded-xl" />
        <div className="flex-1 h-9 skeleton-shimmer rounded-xl" />
      </div>
    </div>
  );
}
