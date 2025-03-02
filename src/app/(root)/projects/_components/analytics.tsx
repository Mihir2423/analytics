"use client";

import { useTabStore } from "@/store/store";
import { ArrowUp } from "lucide-react";
import { AnalyticsGraph } from "./analytics-graph";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Analytics = ({ analytics }: { analytics: any }) => {
  const { activeTab } = useTabStore();
  console.log(analytics);
  return (
    <div
      className={` flex-col gap-2 pb-3 border border-[#383b4183] rounded-lg ${activeTab === "analytics" ? "flex" : "hidden"}`}
    >
      <div className="flex items-center gap-4 border-[#383b4183] border-b">
        <div className="flex flex-col gap-3 p-4 border-[#383b4183] border-r">
          <span className="font-semibold text-[#A1A1A1] text-base">
            Page Visitors
          </span>
          <div className="flex justify-center items-center gap-2 min-w-[100px]">
            <span className="font-medium text-white text-2xl">{analytics?.totalVisitors ?? 0}</span>
            <div className="flex items-center">
              <ArrowUp size={24} className="text-[#64cf62]" />
              <span className="text-[#64cf62]">%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4 border-[#383b4183] border-r">
          <span className="font-semibold text-[#A1A1A1] text-base">
            Page Views
          </span>
          <div className="flex justify-center items-center gap-2 min-w-[100px]">
            <span className="font-medium text-white text-2xl">{analytics?.totalPageVisits ?? 0}</span>
            <div className="flex items-center">
              <ArrowUp size={24} className="text-[#64cf62]" />
              <span className="text-[#64cf62]">%</span>
            </div>
          </div>
        </div>
      </div>
      <AnalyticsGraph visitHistory={analytics?.visitHistory || []} />
    </div>
  );
};
