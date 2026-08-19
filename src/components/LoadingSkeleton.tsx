export default function LoadingSkeleton() {
  return (
    <div className="flex w-full flex-col animate-pulse">
      {/* Header Skeleton */}
      <div className="h-[200px] w-full rounded-b-[2rem] bg-surface-card" />
      
      <div className="flex flex-col gap-10 px-6 py-8">
        {/* Mission Skeleton */}
        <div>
          <div className="mb-5 h-8 w-48 rounded-full bg-surface-card" />
          <div className="h-32 w-full rounded-[1.5rem] bg-surface-card" />
        </div>

        {/* Routines Skeleton */}
        <div>
          <div className="mb-5 h-8 w-40 rounded-full bg-surface-card" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-40 rounded-[2rem] bg-surface-card" />
            <div className="h-40 rounded-[2rem] bg-surface-card" />
            <div className="h-40 rounded-[2rem] bg-surface-card" />
            <div className="h-40 rounded-[2rem] bg-surface-card" />
          </div>
        </div>
      </div>
    </div>
  );
}
