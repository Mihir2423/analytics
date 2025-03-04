"use client";

import { MotionTab } from "@/components/globals/motion-tab";
import { useSettingsTabStore } from "@/store/store";

type Props = {
  tabs: { id: string; label: string }[];
};

export function AnimatedTabs({ tabs }: Props) {
  const { activeTab, setActiveTab } = useSettingsTabStore();

  return (
    <MotionTab tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
  );
}
