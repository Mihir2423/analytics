import React from "react";
import { headers } from "next/headers";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

type Props = {
  children: React.ReactNode;
};

const Provider = async ({ children }: Props) => {
  // Wait for headers to be available
  await headers();

  // Now we can safely call auth()
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
