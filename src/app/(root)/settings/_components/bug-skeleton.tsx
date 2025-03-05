import { Skeleton } from "@/components/ui/skeleton";

export const BugReportSkeleton = () => {
  return (
    <div className="p-4 border border-[#383b4183] rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Skeleton className="bg-[#383b4183] rounded-full w-5 h-5" />
          <div className="space-y-2">
            <Skeleton className="bg-[#383b4183] w-[200px] h-4" />
            <Skeleton className="bg-[#383b4183] w-[150px] h-3" />
          </div>
        </div>
        <Skeleton className="bg-[#383b4183] w-[80px] h-6" />
      </div>
    </div>
  );
};
