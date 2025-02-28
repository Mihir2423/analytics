// src/app/api/metadata/actions.ts
"use server";

import { extractMetadata } from "@/lib/metadata";

export async function fetchMetadataAction(domain: string) {
  try {
    const data = await extractMetadata(`https://${domain}`);
    return data;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}
