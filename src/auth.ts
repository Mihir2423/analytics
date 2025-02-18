
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";

import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // get user from db with the email
        // if there is no user with the email, create new user
        // else set the user data to token
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        // set the token data to session
        if (session.user) {
          session.user.id = token.id as string;
        }
      }

      return session;
    },

    redirect() {
      return "/signin";
    },
  },
});
