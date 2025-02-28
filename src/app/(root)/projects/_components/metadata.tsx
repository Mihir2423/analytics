"use client";

import { useTabStore } from "@/store/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchMetadataAction } from "../actions";
import { MetadataSkeleton } from "./metadata-skeleton";
import { MetadataError } from "./metadata-error";

type MetadataType = {
  title?: string;
  description?: string;
  image?: string;
};

export const Metadata = ({ domain }: { domain: string }) => {
  const { activeTab } = useTabStore();
  const [metadata, setMetadata] = useState<MetadataType | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetchMetadataAction(domain);
        console.log("Metadata:", res);
        if (res) {
          setMetadata({
            title: res.title || "N/A",
            description: res.description || "N/A",
            image: res.image,
          });
        } else {
          setError(true);
          setMetadata(null);
        }
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
        setError(true);
        setMetadata(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMetadata();
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
              <Image
                src="/bg/og.png"
                width={1200}
                height={630}
                alt="OG Image"
                className="rounded-lg w-auto object-contain"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
