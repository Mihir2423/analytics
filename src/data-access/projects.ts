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

export const getDomainProject = async (domain: string) => {
  const res = await prisma.project.findFirst({
    where: {
      domain,
    },
  });
  return res;
};

export const getDomainAnalytics = async (domain: string) => {
  const res = await prisma.project.findFirst({
    where: {
      domain,
    },
    include: {
      analytics: {
        include: {
          visitHistory: true,
          routeAnalytics: true,
          countryAnalytics: true,
          deviceAnalytics: true,
          osAnalytics: true,
          sourceAnalytics: true,
        },
      },
    },
  });
  return res;
};

export const getLogs = async () => {
  const logs = await prisma.log.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return logs;
};
