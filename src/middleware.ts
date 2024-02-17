import { NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";
import { usePathname } from "next/navigation";

export function mainMiddleware(req) {
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/profile/:page*",
  "/dashboard",
  "/settings",
  "/posting",
]);
