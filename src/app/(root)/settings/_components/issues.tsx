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
import { useEffect, useState } from "react";
import { useModal } from "@/store/store";
import { CreateBugReportModal } from "./report-bug";
import { BugReportSkeleton } from "./bug-skeleton";

export const Issues = () => {
  const { activeTab } = useSettingsTabStore();
  const { onOpen } = useModal();
  interface BugReport {
    id: string;
    title: string;
    createdAt: string;
    status: "isResolved" | "inProgress" | "isPending";
  }

  const [bugReports, setBugReports] = useState<BugReport[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch bug reports
  useEffect(() => {
    const fetchBugReports = async () => {
      try {
        const res = await fetch("/api/bug-report");
        const data = await res.json();
        if (data.success) {
          setBugReports(data.bugReports);
        } else {
          console.error("Failed to fetch bug reports:", data.message);
        }
      } catch (error) {
        console.error("Error fetching bug reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBugReports();
  }, []);

  return (
    <Card
      className={`bg-transparent border border-[#383b4183] ${
        activeTab !== "issues" ? "hidden" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-white">Bug Reports</CardTitle>
        <CardDescription>Report issues and track their status.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading ? (
          <>
            <BugReportSkeleton />
            <BugReportSkeleton />
            <BugReportSkeleton />
          </>
        ) : bugReports && Array.isArray(bugReports) && bugReports.length > 0 ? (
          bugReports.map((report) => (
            <div
              key={report.id}
              className="p-4 border border-[#383b4183] rounded-lg"
            >
              <div className="flex max-md:flex-col justify-between items-start md:items-center max-md:gap-4">
                <div className="flex items-center gap-3">
                  <Bug
                    className="w-5 h-5"
                    style={{
                      color:
                        report.status === "isResolved"
                          ? "#10B981"
                          : report.status === "inProgress"
                            ? "#F59E0B"
                            : "#9CA3AF",
                    }}
                  />
                  <div>
                    <p className="max-w-[220px] overflow-hidden font-medium text-white text-ellipsis whitespace-nowrap">
                      {report.title}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Submitted on{" "}
                      {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-2 py-1 rounded font-medium text-xs ${
                    report.status === "isResolved"
                      ? "bg-green-500/10 text-green-500"
                      : report.status === "inProgress"
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-gray-500/10 text-gray-500"
                  }`}
                >
                  {report.status === "inProgress"
                    ? "In Progress"
                    : report.status.substring(2)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center p-6 text-muted-foreground">
            <Bug className="mb-2 w-8 h-8" />
            No bug reports found.
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 border-[#383b4183] border-t">
        <Button
          onClick={() => onOpen("createBugReport")}
          className="bg-[#C05D5D] hover:bg-[#c05d5dcb]"
        >
          Report New Bug
        </Button>
      </CardFooter>
      <CreateBugReportModal />
    </Card>
  );
};
