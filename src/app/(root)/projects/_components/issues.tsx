"use client";

import { useTabStore } from "@/store/store";
import { Construction } from "lucide-react";
import React from "react";

export const Issues = () => {
  const { activeTab } = useTabStore();
  return (
    <div
      className={` flex-col gap-2 p-3 border border-[#383b4183] rounded-lg ${activeTab === "issues" ? "flex" : "hidden"}`}
    >
      <div className="flex flex-col justify-between items-center p-4">
        <div className="flex flex-col items-center text-center">
          <Construction className="w-16 h-16 text-muted-foreground animate-pulse" />
          <div className="space-y-2 mt-6">
            <h2 className="font-semibold text-white text-2xl">
              Under Construction
            </h2>
            <p className="text-muted-foreground">
              <span className="block">
                The page is currently under construction.
              </span>
              <span className="block">Check back soon!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
