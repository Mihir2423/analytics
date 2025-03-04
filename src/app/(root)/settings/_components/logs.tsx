"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSettingsTabStore } from "@/store/store";
import { Activity } from "lucide-react";

export const Logs = () => {
  const { activeTab } = useSettingsTabStore();
  return (
    <Card
      className={`bg-transparent border border-[#383b4183] ${activeTab !== "logs" ? "hidden" : ""}`}
    >
      <CardHeader>
        <CardTitle className="text-white">Activity Log</CardTitle>
        <CardDescription>View your recent account activity.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 pb-4 border-[#383b4183] last:border-0 border-b"
          >
            <div className="flex justify-center items-center mt-1 rounded-full w-8 h-8">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div className="space-y-1">
              <p className="font-medium text-white">Dashboard accessed</p>
              <p className="text-muted-foreground text-sm">
                You logged in from Chrome on Windows
              </p>
              <p className="text-muted-foreground text-xs">
                March {4 - i}, 2025 at 10:{15 + i * 5} AM
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
