"use client";

import { useModal } from "@/store/store";
import React from "react";

export const CreateProject = () => {
  const { onOpen } = useModal();
  return (
    <button
      onClick={() => onOpen("createProject")}
      className="flex items-center gap-2 hover:bg-[#5b5b5d38] px-2 py-0 rounded-md h-[24px] font-medium text-white text-xs transition-colors"
    >
      <span className="text-[#7a7a7c] text-lg">+</span>
      <span className="text-xs">Create Project</span>
    </button>
  );
};
