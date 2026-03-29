export const SkeletonCard = () => {
  return (
    <div className="bg-white border border-neutral-100 rounded-2xl p-5 animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-2">
          <div className="h-3 w-20 bg-neutral-200 rounded" />
          <div className="h-3 w-24 bg-neutral-100 rounded" />
        </div>
        <div className="h-6 w-16 bg-neutral-100 rounded-full" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-neutral-200" />
          <div className="flex flex-col gap-2">
            <div className="h-4 w-32 bg-neutral-200 rounded" />
            <div className="h-3 w-24 bg-neutral-100 rounded" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="h-2 w-10 bg-neutral-100 rounded" />
          <div className="h-4 w-20 bg-neutral-200 rounded" />
        </div>
      </div>
    </div>
  );
};
