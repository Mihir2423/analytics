import { ChevronRight } from "lucide-react";
import React from "react";
import { CreateProject } from "./create-project";

type Props = {
  project?: string;
  title: string;
};

export const Header = ({ project, title }: Props) => {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-[#27282D] border-b">
      <div className="flex items-center gap-3">
        <h2 className="text-white text-sm select-none">{title}</h2>
        {project && (
          <ChevronRight size={16} color="#7A7A7C" className="max-md:hidden" />
        )}
        <span className="max-md:hidden text-[#5B5B5D] text-sm select-none">
          {project ? project : ""}
        </span>
      </div>
      {!project && <CreateProject />}
    </div>
  );
};
