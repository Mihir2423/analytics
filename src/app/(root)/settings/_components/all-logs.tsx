import { getAllLogs } from "@/use-cases/projects";
import { Suspense } from "react";
import { Logs } from "./logs";
import { LogsSkeleton } from "./log-skeleton";

export default async function AllLogs() {
  const logs = await getAllLogs();
  console.log(logs);

  return (
    <Suspense fallback={<LogsSkeleton />}>
      <Logs logs={logs} />
    </Suspense>
  );
}
