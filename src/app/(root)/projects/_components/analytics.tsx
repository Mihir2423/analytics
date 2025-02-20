"use client";

import { useTabStore } from "@/store/store";
import { ArrowUp } from "lucide-react";
import { AnalyticsGraph } from "./analytics-graph";

export const Analytics = () => {
  const { activeTab } = useTabStore();
  return (
    <div
      className={` flex-col gap-2 pb-3 border border-[#383b4183] rounded-lg ${activeTab === "analytics" ? "flex" : "hidden"}`}
    >
      <div className="flex items-center gap-4 border-[#383b4183] border-b">
        <div className="flex flex-col gap-3 p-4 border-[#383b4183] border-r">
          <span className="font-semibold text-[#A1A1A1] text-base">
            Visitors
          </span>
          <div className="flex items-center gap-8">
            <span className="font-medium text-white text-2xl">423</span>
            <div className="flex items-center">
              <ArrowUp size={24} className="text-[#62bdcf]" />
              <span className="text-[#62bdcf]">%</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4 border-[#383b4183] border-r">
          <span className="font-semibold text-[#A1A1A1] text-base">
            Page Views
          </span>
          <div className="flex items-center gap-8">
            <span className="font-medium text-white text-2xl">923</span>
            <div className="flex items-center">
              <ArrowUp size={24} className="text-[#62bdcf]" />
              <span className="text-[#62bdcf]">%</span>
            </div>
          </div>
        </div>
      </div>
      <AnalyticsGraph />
    </div>
  );
};
