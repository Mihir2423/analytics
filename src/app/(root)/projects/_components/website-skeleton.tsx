import { Package } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AnimatedTabs } from "./animated-tab";

const WebsiteDetailSkeleton = () => {
  const tabs = [
    { id: "metadata", label: "Metadata" },
    { id: "analytics", label: "Analytics" },
    { id: "issues", label: "Issues" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center px-5 md:px-8 py-5 md:py-4 border-[#383b4183] border-b">
        <Skeleton className="w-48 h-8" />
        <div className="flex gap-2">
          <Skeleton className="bg-slate-500 w-20 h-8" />
          <Skeleton className="bg-slate-500 w-20 h-8" />
        </div>
      </div>
      <div className="p-5 md:px-32 md:py-10">
        <div className="flex flex-col items-start mt-2 py-2 border-[#383b4183] border-b">
          <Package size={24} className="mb-4 text-[#626366]" />
          <Skeleton className="bg-slate-500 mb-2 w-48 h-8" />
          <Skeleton className="bg-slate-500 mb-2 w-36 h-4" />
          <Skeleton className="bg-slate-500 w-4/5 h-20" />
        </div>
        <div className="flex flex-col gap-4 py-4">
          <AnimatedTabs tabs={tabs} />
          <div className="space-y-4">
            <Skeleton className="mb-2 w-36 h-8" />
            <div className="gap-4 grid grid-cols-2">
              <Skeleton className="bg-slate-500 w-full h-24" />
              <Skeleton className="bg-slate-500 w-full h-24" />
              <Skeleton className="bg-slate-500 w-full h-24" />
              <Skeleton className="bg-slate-500 w-full h-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetailSkeleton;
