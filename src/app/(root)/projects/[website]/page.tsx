import React from "react";
import { Header } from "../_components/header";
import { Package, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

const WebsiteDetailPage = () => {
  return (
    <div>
      <Header project="Project Name" />
      <div className="px-32 py-10">
        <div className="flex flex-col items-start mt-2 py-2 border-[#383b4183] border-b">
          <Package size={24} className="mb-4 text-[#626366]" />
          <h3 className="font-medium text-white text-2xl">Project Name</h3>
          <Link
            href="https://mihircodes.in"
            className="flex items-center gap-1 font-medium text-[#62bdcf] text-sm"
          >
            mihircodes.in <SquareArrowOutUpRight size={9} />
          </Link>
          <p className="mt-2 w-3/5 font-medium text-white text-base text-pretty">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            explicabo deleniti magnam veniam itaque voluptatibus, dolorem sit
            autem laudantium aspernatur.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetailPage;
