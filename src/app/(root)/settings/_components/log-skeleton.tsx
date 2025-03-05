"use client";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSettingsTabStore } from "@/store/store";
export const LogsSkeleton = () => {
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
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-start gap-4 pb-4 border-[#383b4183] last:border-0 border-b"
          >
            <Skeleton className="bg-[#383b4183] rounded-full w-8 h-8" />
            <div className="flex-1 space-y-2">
              <Skeleton className="bg-[#383b4183] w-[200px] h-4" />
              <Skeleton className="bg-[#383b4183] w-[150px] h-3" />
              <Skeleton className="bg-[#383b4183] w-[100px] h-3" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
