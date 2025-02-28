import "server-only";
import prisma from "@/lib/db";

export const getProjects = async (userId: string) => {
  const res = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
  });
  return res;
};
