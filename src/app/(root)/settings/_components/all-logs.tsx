import { getAllLogs } from "@/use-cases/projects";
import { Suspense } from "react";
import { Logs } from "./logs";

export default async function AllLogs() {
  const logs = await getAllLogs();
  console.log(logs);

  return (
    <Suspense fallback={<div>Loading logs...</div>}>
      <Logs logs={logs} />
    </Suspense>
  );
}
