"use client";

import { Button } from "@/components/ui/button";
import { FilePenLine, Trash } from "lucide-react";
export const ProjectCard = () => {
  const text =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat vero illo.";
  return (
    <div className="flex gap-2 bg-transparent p-3 border border-[#27282D] rounded-md w-full h-fit">
      <div className="flex flex-col flex-1 gap-2 pr-2 h-full overflow-hidden">
        <div className="flex items-center gap-2">
          <div className="overflow-hidden text-white text-sm text-ellipsis text-nowrap">
            Project Name
          </div>
          <div className="bg-green-400 p-[2px] rounded-full animate-pulse">
            <div className="bg-green-500 rounded-full size-[5px]" />
          </div>
        </div>
        <div className="text-[#5B5B5D] text-xs text-pretty">
          {text?.length > 80 ? `${text.slice(0, 80)}...` : text}
        </div>
      </div>
      <div className="flex flex-col gap-2 pl-3 border-[#27282D] border-l h-full">
        <Button className="bg-transparent p-0 rounded-full text-[#589eaafb]">
          <FilePenLine size={16} />
        </Button>
        <Button className="bg-transparent p-0 rounded-full text-[#f97171]">
          <Trash size={16} />
        </Button>
      </div>
    </div>
  );
};
