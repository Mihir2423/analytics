import "server-only";

import { auth } from "@/auth";
import { AuthenticationError } from "./utils";

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return undefined;
  }
  return session.user;
};

export const assertAuthenticated = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new AuthenticationError();
  }
  return user;
};
