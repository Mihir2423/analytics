"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSettingsTabStore } from "@/store/store";
import { Activity, AlertCircle, Bell, Clock, Shield } from "lucide-react";

export const Logs = () => {
  const { activeTab } = useSettingsTabStore();

  const colors = ["#FF6B6B", "#4ECDC4", "#FFD166", "#6B5B95", "#45B6FE"];

  const icons = [Activity, AlertCircle, Bell, Clock, Shield];

  const logEntries = [
    {
      title: "Product Update",
      description: "Added new feature: Dark Mode.",
      date: "March 4, 2025 at 10:15 AM",
    },
    {
      title: "Maintenance",
      description: "Performed server maintenance to improve performance.",
      date: "March 3, 2025 at 09:30 AM",
    },
    {
      title: "Bug Fix",
      description: "Resolved issue with user authentication flow.",
      date: "March 2, 2025 at 03:45 PM",
    },
    {
      title: "New Release",
      description: "Launched version 2.0 of the product.",
      date: "March 1, 2025 at 12:00 PM",
    },
    {
      title: "Security Patch",
      description: "Applied critical security updates.",
      date: "February 28, 2025 at 08:00 AM",
    },
  ];

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
        {logEntries.map((entry, i) => {
          const IconComponent = icons[i % icons.length];
          return (
            <div
              key={i}
              className="flex items-start gap-4 pb-4 border-[#383b4183] last:border-0 border-b"
            >
              <div
                className="flex justify-center items-center mt-1 rounded-full w-8 h-8"
                style={{ backgroundColor: colors[i % colors.length] }}
              >
                <IconComponent className="w-4 h-4 text-white" />
              </div>
              <div className="space-y-1">
                <p className="font-medium text-white">{entry.title}</p>
                <p className="text-muted-foreground text-sm">
                  {entry.description}
                </p>
                <p className="text-muted-foreground text-xs">{entry.date}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
