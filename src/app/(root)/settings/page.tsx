import { Suspense } from "react";
import AllLogs from "./_components/all-logs";
import { AnimatedTabs } from "./_components/animated-tab";
import { Issues } from "./_components/issues";

const SettingsPage = () => {
  const tabs = [
    { id: "logs", label: "Logs" },
    { id: "issues", label: "Issues" },
  ];
  return (
    <div className="md:p-4">
      <div className="flex flex-col gap-4 p-4 w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold text-white text-3xl">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
        <AnimatedTabs tabs={tabs} />
        <Suspense fallback={<div>Loading logs...</div>}>
          <AllLogs />
        </Suspense>
        <Issues />
      </div>
    </div>
  );
};

export default SettingsPage;
