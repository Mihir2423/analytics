import "server-only";
import { getDomainProject, getProjects } from "@/data-access/projects";

export const getAllProjects = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  try {
    const res = await getProjects(id);
    return res || [];
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
