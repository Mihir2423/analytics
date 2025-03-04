"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSettingsTabStore } from "@/store/store";
import { Bug } from "lucide-react";

import React from "react";

export const Issues = () => {
  const { activeTab } = useSettingsTabStore();
  return (
    <Card
      className={`bg-transparent border border-[#383b4183] ${activeTab !== "issues" ? "hidden" : ""}`}
    >
      <CardHeader>
        <CardTitle className="text-white">Bug Reports</CardTitle>
        <CardDescription>Report issues and track their status.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border border-[#383b4183] rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Bug className="w-5 h-5 text-amber-500" />
              <div>
                <p className="font-medium text-white">Dashboard loading issue</p>
                <p className="text-muted-foreground text-sm">
                  Submitted on March 1, 2025
                </p>
              </div>
            </div>
            <div className="bg-amber-500/10 px-2 py-1 rounded font-medium text-amber-500 text-xs">
              In Progress
            </div>
          </div>
        </div>
        <div className="p-4 border border-[#383b4183] rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Bug className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium text-white">Export data error</p>
                <p className="text-muted-foreground text-sm">
                  Submitted on February 25, 2025
                </p>
              </div>
            </div>
            <div className="bg-green-500/10 px-2 py-1 rounded font-medium text-green-500 text-xs">
              Resolved
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 border-[#383b4183] border-t">
        <Button>Report New Bug</Button>
      </CardFooter>
    </Card>
  );
};
