import { DEFAULT_LOGIN_REDIRECT, PUBLIC_ROUTES, AUTH_ROUTES } from "@/routes";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req: any) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;

  console.log("isAuthenticated", isAuthenticated);

  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname);
  if (
    nextUrl.pathname.startsWith("/api") ||
    PUBLIC_ROUTES.includes(nextUrl.pathname)
  ) {
    return NextResponse.next(); // Allow the request to proceed
  }

  if (isAuthRoute && isAuthenticated)
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));

  if (!isAuthenticated && !isAuthRoute)
    return NextResponse.redirect(new URL("/signin", nextUrl));
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
