"use client";

import { useKeyboardShortcut, useModal } from "@/store/store";
import { Command } from "lucide-react";
import React from "react";

export const CreateProject = () => {
  const { onOpen } = useModal();
  useKeyboardShortcut();
  return (
    <button
      onClick={() => onOpen("createProject")}
      className="flex items-center gap-2 hover:bg-[#5b5b5d38] px-2 py-0 rounded-md h-[32px] font-medium text-white text-xs transition-colors"
    >
      <span className="text-[#7a7a7c] text-lg">+</span>
      <span className="text-xs">Create Project</span>
      <span className="flex items-center gap-[1px] bg-[#5b5b5d38] px-2 py-[3px] rounded-sm text-sm">
        <Command size={10} className="translate-y-[1px]" /> m
      </span>
    </button>
  );
};
