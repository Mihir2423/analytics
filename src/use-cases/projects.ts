import "server-only";

import { getProjects } from "@/data-access/projects";

export const getAllProjects = async (id: string | undefined) => {
  if (!id) {
    return null;
  }
  const res = await getProjects(id);
  return res || [];
};
