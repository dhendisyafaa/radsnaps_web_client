import { nextAuthSecret } from "@/configs/config";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

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
    }
    return middleware(req, next);
  };
}
