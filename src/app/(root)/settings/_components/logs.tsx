"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSettingsTabStore } from "@/store/store";
import { AlertCircle, Bell, CloudAlert } from "lucide-react";

// Map log levels to colors
const logLevelColors = {
  info: "#4ECDC4",
  warn: "#FFD166",
  error: "#FF6B6B",
};

// Map log levels to icons
const logLevelIcons = {
  info: Bell,
  warn: AlertCircle,
  error: CloudAlert,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Logs = ({ logs }: { logs: any[] }) => {
  const { activeTab } = useSettingsTabStore();

  return (
    <Card
      className={`bg-transparent border border-[#383b4183] ${
        activeTab !== "logs" ? "hidden" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-white">Product Log</CardTitle>
        <CardDescription>
          Admin-generated log of product updates, maintenance, and changes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.isArray(logs) && logs.length > 0 ? (
          logs.map((entry, i) => {
            const IconComponent =
              logLevelIcons[entry.level as keyof typeof logLevelIcons] || Bell;
            const color =
              logLevelColors[entry.level as keyof typeof logLevelColors] ||
              "#45B6FE";
            return (
              <div
                key={i}
                className="flex items-start gap-4 pb-4 border-[#383b4183] last:border-0 border-b"
              >
                <div
                  className="flex justify-center items-center mt-1 rounded-full w-8 h-8"
                  style={{ backgroundColor: color }}
                >
                  <IconComponent className="w-4 h-4 text-white" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-white">{entry.message}</p>
                  <p className="text-muted-foreground text-sm">
                    {entry.user?.email || "System"}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {new Date(entry.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col flex-grow flex-1 justify-center items-center gap-3 p-3 w-full h-full min-h-[148px] text-white">
            <CloudAlert className="text-white" size={32} />
            No Data Found
          </div>
        )}
      </CardContent>
    </Card>
  );
};
