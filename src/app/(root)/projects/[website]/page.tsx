import { Package, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { AnimatedTabs } from "../_components/animated-tab";
import { Header } from "../_components/header";
import { Metadata } from "../_components/metadata";
import { Analytics } from "../_components/analytics";
import { Issues } from "../_components/issues";

const WebsiteDetailPage = () => {
  const tabs = [
    { id: "metadata", label: "Metadata" },
    { id: "analytics", label: "Analytics" },
    { id: "issues", label: "Issues" },
  ];

  return (
    <div>
      <Header project="Personal Portfolio" />
      <div className="px-32 py-10">
        <div className="flex flex-col items-start mt-2 py-2 border-[#383b4183] border-b">
          <Package size={24} className="mb-4 text-[#626366]" />
          <h3 className="font-medium text-white text-2xl">
            {"Personal Portfolio"}
          </h3>
          <Link
            href="https://mihircodes.in"
            className="flex items-center gap-1 font-medium text-[#62bdcf] text-sm"
          >
            mihircodes.in <SquareArrowOutUpRight size={9} />
          </Link>
          <p className="mt-2 w-4/5 font-medium text-white text-base text-pretty">
            A personal portfolio website designed to highlight my skills,
            projects, and professional journey. Built with modern web
            technologies, it serves as a central hub to showcase my expertise in
            frontend development, API integrations, and full-stack projects.
          </p>
        </div>
        <div className="flex flex-col gap-4 py-4">
          <AnimatedTabs tabs={tabs} />
          <Metadata />
          <Analytics />
          <Issues />
        </div>
      </div>
    </div>
  );
};

export default WebsiteDetailPage;
