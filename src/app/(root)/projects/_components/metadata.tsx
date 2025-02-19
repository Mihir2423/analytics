"use client";

import { useTabStore } from "@/store/store";
import Image from "next/image";
import React from "react";

export const Metadata = () => {
  const { activeTab } = useTabStore();
  return (
    <div
      className={` flex-col gap-2 p-3 border border-[#383b4183] rounded-lg ${activeTab === "metadata" ? "flex" : "hidden"}`}
    >
      <div className="flex flex-col gap-1">
        <span className="text-[#ffffff9c] text-xs">Title</span>
        <p className="text-white text-sm">{"Mihir's Portfolio"}</p>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[#ffffff9c] text-xs">Description</span>
        <p className="text-white text-sm">
          {"My Portfolio for showcasing my skills and work!"}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-[#ffffff9c] text-xs">Opengraph Image</span>
        <Image
          src="/bg/og.png"
          width={1200}
          height={630}
          alt="OG Image"
          className="rounded-lg w-auto object-contain"
        />
      </div>
    </div>
  );
};
