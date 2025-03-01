import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const ProjectSkelteon = () => {
  return (
    <div className="p-3 w-full h-full">
      <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full">
        <Skeleton className="bg-slate-500 border border-[#27282D] rounded-md w-full h-[200px]" />
        <Skeleton className="bg-slate-500 border border-[#27282D] rounded-md w-full h-[200px]" />
        <Skeleton className="bg-slate-500 border border-[#27282D] rounded-md w-full h-[200px]" />
      </div>
    </div>
  );
};
