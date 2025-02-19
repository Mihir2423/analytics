"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/store/store";
import { FilePenLine, SquareArrowOutUpRight, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export const ProjectCard = () => {
  const { onOpen } = useModal();
  const router = useRouter();
  const text =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat vero illo.";
  return (
    <div
      role="button"
      onClick={() => router.push("/projects/website")}
      className="flex items-center gap-2 bg-transparent p-3 border border-[#27282D] rounded-md w-full h-fit cursor-pointer"
    >
      <div className="flex flex-col flex-1 gap-2 pr-2 h-full overflow-hidden">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="overflow-hidden text-white text-sm text-ellipsis text-nowrap">
              Project Name
            </h2>
            <div className="bg-green-400 p-[2px] rounded-full animate-pulse">
              <div className="bg-green-500 rounded-full size-[5px]" />
            </div>
          </div>
          <Link
            href="/projects/website"
            className="flex items-center gap-1 text-[#62bdcf] text-[11px] 2xl:text-xs underline"
          >
            domain.dom
            <SquareArrowOutUpRight size={9} />
          </Link>
        </div>
        <div className="text-[#a0a0a4] text-xs 2xl:text-sm text-pretty">
          {text?.length > 60 ? `${text.slice(0, 60)}...` : text}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-2 pl-3 border-[#27282D] border-l h-full">
        <Button
          onClick={() => onOpen("editProject")}
          className="bg-transparent p-0 rounded-full text-[#589eaafb]"
        >
          <FilePenLine size={16} />
        </Button>
        <Button
          onClick={() => onOpen("deleteProject")}
          className="bg-transparent p-0 rounded-full text-[#f97171]"
        >
          <Trash size={16} />
        </Button>
      </div>
    </div>
  );
};
