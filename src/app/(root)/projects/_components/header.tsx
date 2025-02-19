import { ChevronRight } from "lucide-react";
import React from "react";
import { CreateProject } from "./create-project";

export const Header = () => {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-[#27282D] border-b">
      <div className="flex items-center gap-3">
        <h2 className="text-white text-sm select-none">Your Projects</h2>
        <ChevronRight size={16} color="#7A7A7C" className="max-md:hidden" />
        <span className="max-md:hidden text-[#5B5B5D] text-sm select-none">
          No projects created yet
        </span>
      </div>
      <CreateProject />
    </div>
  );
};
