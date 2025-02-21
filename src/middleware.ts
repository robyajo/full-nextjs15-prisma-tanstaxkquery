import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import { privateRoutes, adminRoutes } from "./routes";
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, auth } = req;
  const isLoggedIn = !!req.auth;
  const isAdmin = req.auth?.user?.role === "admin";
  const isUser = req.auth?.user?.role === "user";

  // const { nextUrl } = req;
  const sessionUser = auth?.user;
  console.log("\n user in middleware:>> ", sessionUser);
  console.log("ROUTE:", nextUrl.pathname);
  console.log("IS LOGGED IN:", isLoggedIn);
  console.log("IS ADMIN:", isAdmin);
  const url = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.includes("/auth");
  const isApiRoute = nextUrl.pathname.includes("/api");

  const isAdminRoute = adminRoutes.includes(nextUrl.pathname);

  if (isApiRoute) {
    return;
  }
  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${url}/dashboard`);
  }
  if (isAuthRoute && !isLoggedIn) {
    return;
  }
  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(`${url}/auth/login`);
  }

  if (nextUrl.pathname.startsWith("/dashboard/post") && !isAdmin) {
    return NextResponse.rewrite(new URL("/forbidden", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
