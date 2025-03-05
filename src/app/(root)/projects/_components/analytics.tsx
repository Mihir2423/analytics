/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTabStore } from "@/store/store";
import { ArrowUp, CloudAlert, Copy } from "lucide-react";
import { AnalyticsGraph } from "./analytics-graph";
import { NextJsScript, CodeDisplay } from "@/config/code";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Analytics = ({ analytics }: { analytics: any }) => {
  const { activeTab } = useTabStore();
  const [scriptHtml, setScriptHtml] = useState<string | null>(null);

  useEffect(() => {
    const fetchScriptHtml = async () => {
      if (!analytics) {
        const html = await NextJsScript();
        setScriptHtml(html);
      }
    };
    fetchScriptHtml();
  }, [analytics]);

  const handleNextScriptCopy = async () => {
    try {
      if (!scriptHtml) return;
      await navigator.clipboard.writeText(scriptHtml);
      toast.success("Copied to clipboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to copy to clipboard");
    }
  };

  // If no analytics data is available
  if (!analytics) {
    return (
      <div
        className={`flex-col border border-[#383b4183] rounded-lg ${
          activeTab === "analytics" ? "flex" : "hidden"
        }`}
      >
        <div className="flex flex-col justify-center items-center gap-4 p-8 text-white">
          <CloudAlert size={48} className="text-neutral-400" />
          <h2 className="font-semibold text-xl">No Analytics Data</h2>
          <p className="text-neutral-400 text-center">
            It seems like analytics tracking is not set up for your website.
          </p>

          {scriptHtml && (
            <div className="relative mt-4 w-full">
              <button
                onClick={handleNextScriptCopy}
                className="top-4 right-4 absolute"
              >
                <Copy size={16} className="text-neutral-300" />
              </button>
              <CodeDisplay html={scriptHtml} />
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div
      className={` flex-col border border-[#383b4183] rounded-lg ${activeTab === "analytics" ? "flex" : "hidden"}`}
    >
      <div className="flex items-center gap-4 border-[#383b4183] border-b">
        <div className="flex flex-col gap-3 p-4 border-[#383b4183] border-r">
          <span className="font-semibold text-[#A1A1A1] text-base">
            Page Visitors
          </span>
          <div className="flex justify-center items-center gap-2 min-w-[100px]">
            <span className="font-medium text-white text-2xl">
              {analytics?.totalVisitors ?? 0}
            </span>
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
            <span className="font-medium text-white text-2xl">
              {analytics?.totalPageVisits ?? 0}
            </span>
            <div className="flex items-center">
              <ArrowUp size={24} className="text-[#64cf62]" />
              <span className="text-[#64cf62]">%</span>
            </div>
          </div>
        </div>
      </div>
      <AnalyticsGraph visitHistory={analytics?.visitHistory || []} />
      <div className="grid grid-cols-2 border-[#383b4183] border-t">
        <div className="flex flex-col gap-1 border-[#383b4183] border-r">
          <div className="flex justify-between items-center p-3 border-[#383b4183] border-b w-full">
            <span className="text-white text-base">Pages</span>
            <span className="text-neutral-400 text-xs uppercase">
              Page Views
            </span>
          </div>
          <div className="flex flex-col gap-2 p-3 pt-1 w-full">
            {Array.isArray(analytics?.routeAnalytics) &&
            analytics?.routeAnalytics?.length > 0 ? (
              analytics?.routeAnalytics
                ?.slice(0, 4)
                ?.map((route: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gradient-to-r from-[#4e4e4e23] via-[#2d2d2d52] to-[#2d2d2d85] px-2 py-1 rounded-md w-full"
                  >
                    <span className="text-white text-base">{route.route}</span>
                    <span className="font-semibold text-white text-base">
                      {route.pageVisits}
                    </span>
                  </div>
                ))
            ) : (
              <div className="flex flex-col flex-grow flex-1 justify-center items-center gap-3 p-3 w-full h-full min-h-[148px] text-white">
                <CloudAlert className="text-white" size={32} />
                No Data Found
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center p-3 border-[#383b4183] border-b w-full">
            <span className="text-white text-base">Devices</span>
            <span className="text-neutral-400 text-xs uppercase">Visitors</span>
          </div>
          <div className="flex flex-col gap-2 p-3 pt-1 w-full">
            {Array.isArray(analytics?.deviceAnalytics) &&
            analytics?.deviceAnalytics?.length > 0 ? (
              analytics?.deviceAnalytics
                ?.slice(0, 4)
                ?.map((route: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gradient-to-r from-[#4e4e4e23] via-[#2d2d2d52] to-[#2d2d2d85] px-2 py-1 rounded-md w-full"
                  >
                    <span className="text-white text-sm">
                      {route.deviceType}
                    </span>
                    <span className="font-semibold text-white text-base">
                      {route.visitors}
                    </span>
                  </div>
                ))
            ) : (
              <div className="flex flex-col flex-grow flex-1 justify-center items-center gap-3 p-3 w-full h-full min-h-[148px] text-white">
                <CloudAlert className="text-white" size={32} />
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 border-[#383b4183] border-t">
        <div className="flex flex-col gap-1 border-[#383b4183] border-r">
          <div className="flex justify-between items-center p-3 border-[#383b4183] border-b w-full">
            <span className="text-white text-base">Countries</span>
            <span className="text-neutral-400 text-xs uppercase">Visitors</span>
          </div>
          <div className="flex flex-col gap-2 p-3 pt-1 w-full min-h-[148px]">
            {Array.isArray(analytics?.countryAnalytics) &&
            analytics?.countryAnalytics?.length > 0 ? (
              analytics?.countryAnalytics
                ?.slice(0, 4)
                ?.map((route: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gradient-to-r from-[#4e4e4e23] via-[#2d2d2d52] to-[#2d2d2d85] px-2 py-1 rounded-md w-full"
                  >
                    <span className="text-white text-base">
                      {route.countryName}
                    </span>
                    <span className="font-semibold text-white text-base">
                      {route.visitors}
                    </span>
                  </div>
                ))
            ) : (
              <div className="flex flex-col flex-grow flex-1 justify-center items-center gap-3 p-3 w-full h-full min-h-[148px] text-white">
                <CloudAlert className="text-white" size={32} />
                No Data Found
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 border-[#383b4183] border-r">
          <div className="flex justify-between items-center p-3 border-[#383b4183] border-b w-full">
            <span className="text-white text-base">Operating System</span>
            <span className="text-neutral-400 text-xs uppercase">
              Page Views
            </span>
          </div>
          <div className="flex flex-col gap-2 p-3 pt-1 w-full min-h-[148px]">
            {Array.isArray(analytics?.osAnalytics) &&
            analytics?.osAnalytics?.length > 0 ? (
              analytics?.osAnalytics
                ?.slice(0, 4)
                ?.map((route: any, i: number) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-gradient-to-r from-[#4e4e4e23] via-[#2d2d2d52] to-[#2d2d2d85] px-2 py-1 rounded-md w-full"
                  >
                    <span className="text-white text-base">{route.osName}</span>
                    <span className="font-semibold text-white text-base">
                      {route.visitors}
                    </span>
                  </div>
                ))
            ) : (
              <div className="flex flex-col flex-grow flex-1 justify-center items-center gap-3 p-3 w-full h-full min-h-[148px] text-white">
                <CloudAlert className="text-white" size={32} />
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
