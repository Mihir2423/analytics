import { Skeleton } from "@/components/ui/skeleton";

export const MetadataSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-3 border border-[#383b4183] rounded-lg">
      <div className="flex flex-col gap-1">
        <Skeleton className="bg-slate-500 mb-1 w-16 h-4" />
        <Skeleton className="bg-slate-500 w-full h-5" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="bg-slate-500 mb-1 w-24 h-4" />
        <Skeleton className="bg-slate-500 w-full h-16" />
      </div>
      <div className="flex flex-col gap-1">
        <Skeleton className="bg-slate-500 mb-2 w-32 h-4" />
        <Skeleton className="bg-slate-500 rounded-lg w-full h-64" />
      </div>
    </div>
  );
};
