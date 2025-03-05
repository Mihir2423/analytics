import "server-only";
import {
  getDomainAnalytics,
  getDomainProject,
  getLogs,
  getProjects,
} from "@/data-access/projects";

import { unstable_cache as cache } from "next/cache";

export const getAllProjects = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  try {
    const res = await cache(
      async () => {
        const projects = await getProjects(id);
        return projects || [];
      },
      ["all-projects", id],
      { tags: ["projects"] },
    )();
    return res;
  } catch (error) {
    console.error("Error fetching all projects:", error);
    return [];
  }
};
export const getProjectByDomain = async (domain: string | null) => {
  if (!domain) {
    return null;
  }
  try {
    const res = await getDomainProject(domain);
    return res;
  } catch (error) {
    console.error(`Error fetching project for domain ${domain}:`, error);
    return null;
  }
};

export const getAnalytics = async (domain: string | null) => {
  if (!domain) {
    return null;
  }
  try {
    const res = await getDomainAnalytics(domain);
    return res;
  } catch (error) {
    console.error(`Error fetching analytics for domain ${domain}:`, error);
    return null;
  }
};

export const getAllLogs = async () => {
  try {
    const res = await cache(
      async () => {
        const logs = await getLogs();
        return logs || [];
      },
      ["all-logs"],
      { tags: ["logs"] },
    )();
    return res;
  } catch (error) {
    console.error("Error fetching all logs:", error);
    return [];
  }
};
