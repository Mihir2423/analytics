// src/app/api/metadata/actions.ts
"use server";

import { extractMetadata } from "@/lib/metadata";

export async function fetchMetadataAction(domain: string) {
  try {
    const data = await extractMetadata(`https://${domain}`);
    if (data.error) {
      return null;
    }
    return data;
  } catch (error) {
    return { error };
  }
}
