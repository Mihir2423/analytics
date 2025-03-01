"use client";

import React from "react";
import Link from "next/link";
import { useProject } from "@/contexts/project-context";
import { Package, SquareArrowOutUpRight } from "lucide-react";
import Image from "next/image";
type Props = {
  website: string;
  websiteData: {
    name: string | null;
    description: string | null;
  };
};

export const ProjectData = ({ website, websiteData }: Props) => {
  const { favIcon } = useProject();
  return (
    <div className="flex flex-col items-start mt-2 py-2 border-[#383b4183] border-b">
      {favIcon && favIcon !== "" ? (
        <Image
          src={`https://${website}/${favIcon}`}
          alt="favicon"
          width={24}
          height={24}
          className="mb-4"
        />
      ) : (
        <Package size={24} className="mb-4 text-[#626366]" />
      )}
      <h3 className="font-medium text-white text-2xl">{websiteData?.name}</h3>
      <Link
        href={`https://${website}`}
        className="flex items-center gap-1 font-medium text-[#62bdcf] text-sm"
      >
        {website} <SquareArrowOutUpRight size={9} />
      </Link>
      <p className="mt-2 w-4/5 font-medium text-white text-base text-pretty">
        {websiteData?.description}
      </p>
    </div>
  );
};
