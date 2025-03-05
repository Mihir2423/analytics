"use client";

import { useTabStore } from "@/store/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchMetadataAction } from "../actions";
import { MetadataSkeleton } from "./metadata-skeleton";
import { MetadataError } from "./metadata-error";
import { useProject } from "@/contexts/project-context";
import { CloudAlert } from "lucide-react";

type MetadataType = {
  title?: string;
  description?: string;
  image?: string;
  favicon?: string;
};

export const Metadata = ({ domain }: { domain: string }) => {
  const { activeTab } = useTabStore();
  const [metadata, setMetadata] = useState<MetadataType | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setFavIcon } = useProject();

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetchMetadataAction(domain);
        if (res && "data" in res) {
          const { data, error } = res;
          if (error) {
            setError(true);
            setMetadata(null);
            return;
          }
          if (data) {
            setMetadata({
              title: data?.title || "N/A",
              description: data?.description || "N/A",
              image: data?.image ?? undefined,
            });
            setFavIcon(data?.favicon || "");
          } else {
            setError(true);
            setMetadata(null);
          }
        }
      } catch (error) {
        console.error(error);
        setError(true);
        setMetadata(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  return (
    <div
      className={`flex-col gap-2 p-3 border border-[#383b4183] rounded-lg ${
        activeTab === "metadata" ? "flex" : "hidden"
      }`}
    >
      {loading ? (
        <MetadataSkeleton />
      ) : error ? (
        <MetadataError />
      ) : (
        <>
          <div className="flex flex-col gap-1">
            <span className="text-[#ffffff9c] text-xs">Title</span>
            <p className="text-white text-sm">{metadata?.title}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#ffffff9c] text-xs">Description</span>
            <p className="text-white text-sm">{metadata?.description}</p>
          </div>
          {metadata?.image ? (
            <div className="flex flex-col gap-2">
              <span className="text-[#ffffff9c] text-xs">Opengraph Image</span>
              <Image
                src={metadata.image}
                width={1200}
                height={630}
                alt="OG Image"
                className="rounded-lg w-auto object-fill"
              />
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <span className="text-[#ffffff9c] text-xs">Opengraph Image</span>
              <div className="flex flex-col flex-grow flex-1 justify-center items-center gap-3 p-3 w-full h-full min-h-[148px] text-white">
                <CloudAlert className="text-white" size={32} />
                No OG Image Found
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
