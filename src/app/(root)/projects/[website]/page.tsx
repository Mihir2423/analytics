import { Package, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { AnimatedTabs } from "../_components/animated-tab";
import { Header } from "../_components/header";
import { Metadata } from "../_components/metadata";
import { Analytics } from "../_components/analytics";
import { Issues } from "../_components/issues";
import { getProjectByDomain } from "@/use-cases/projects";
import WebsiteDetailSkeleton from "../_components/website-skeleton";
import { Suspense } from "react";

type Props = {
  params: Promise<{ website: string }>;
};

const WebsiteDetailPage = async ({ params }: Props) => {
  const { website } = await params;

  return (
    <Suspense fallback={<WebsiteDetailSkeleton />}>
      <WebsiteDetail website={website} />
    </Suspense>
  );
};

const WebsiteDetail = async ({ website }: { website: string }) => {
  const websiteData = await getProjectByDomain(website);
  const tabs = [
    { id: "metadata", label: "Metadata" },
    { id: "analytics", label: "Analytics" },
    { id: "issues", label: "Issues" },
  ];
  return (
    <>
      <Header project={websiteData?.name} />
      <div className="px-32 py-10">
        <div className="flex flex-col items-start mt-2 py-2 border-[#383b4183] border-b">
          <Package size={24} className="mb-4 text-[#626366]" />
          <h3 className="font-medium text-white text-2xl">
            {websiteData?.name}
          </h3>
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
        <div className="flex flex-col gap-4 py-4">
          <AnimatedTabs tabs={tabs} />
          <Metadata domain={website} />
          <Analytics />
          <Issues />
        </div>
      </div>
    </>
  );
};

export default WebsiteDetailPage;
