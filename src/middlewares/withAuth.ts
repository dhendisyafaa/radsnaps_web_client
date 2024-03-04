import { nextAuthSecret } from "@/configs/config";
import { useUserData } from "@/hooks/useUserData";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const onlyAdminUrl = ["/dashboard", "/dashboard/:path*"];

export default function withAuth(middleware, requireAuth) {
  return async (req, next) => {
    const pathname = req.nextUrl.pathname;
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: nextAuthSecret,
      });
      if (!token) {
        const url = new URL("/auth/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token.role != "ADMIN" && onlyAdminUrl.includes(pathname)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
    return middleware(req, next);
  };
}
