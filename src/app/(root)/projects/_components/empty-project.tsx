"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "@/store/store";
import Image from "next/image";
import React from "react";

export const EmptyProject = () => {
  const { onOpen } = useModal();
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="flex flex-col items-start gap-4">
        <Image
          src="/icons/project.svg"
          width={100}
          height={80}
          className="w-auto h-[80px]"
          alt="project"
        />
        <div className="flex flex-col gap-3">
          <h3 className="text-white">Projects</h3>
          <p className="max-w-[360px] text-[#5B5B5D] text-sm text-pretty">
            Add projects and track their analytics in real time. By monitoring
            key metrics, you gain valuable insights into performance, helping
            you make data-driven decisions to improve and grow your project
            effectively.
          </p>
        </div>
        <Button
          onClick={() => onOpen("createProject")}
          className="bg-[#3d7682] hover:bg-[#3d7782c3] px-6 py-0 w-fit h-8 text-sm"
        >
          Create new project
        </Button>
      </div>
    </div>
  );
};
