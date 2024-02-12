"use client";

import { cn } from "@/lib/utils";
import {
  GalleryHorizontal,
  GalleryVerticalEnd,
  Home,
  Plus,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationButton() {
  const pathname = usePathname();
  const params = useSearchParams();
  const filterValue = params.get("filter");
  // const { username } = useDecodedToken();
  const username = "test";

  const currUrl = filterValue ? `${pathname}?filter=${filterValue}` : pathname;

  return (
    <div className="flex gap-3 p-2 mx-1 md:mx-0 rounded-full items-center justify-around shadow-[0px_-1px_30px_0px_#7c3aed8b] md:shadow-md min-w-max bg-background">
      <Link href="/">
        <div
          className={cn(
            "px-6 py-2 text-xs font-bold rounded-full",
            currUrl === "/"
              ? "bg-primary text-white"
              : "bg-background text-foreground"
          )}
        >
          <div className="md:hidden [&_svg]:h-5 [&_svg]:w-5">
            <Home />
          </div>
          <div className="hidden md:block">HOME</div>
        </div>
      </Link>
      <Link href="/gallery?filter=trending">
        <div
          className={cn(
            "px-6 py-2 text-xs font-bold rounded-full",
            currUrl === "/gallery?filter=trending" ||
              currUrl === "/gallery?filter=newest" ||
              currUrl === "/gallery?filter=oldest"
              ? "bg-primary text-white"
              : "bg-background text-foreground"
          )}
        >
          <div className="md:hidden [&_svg]:h-5 [&_svg]:w-5">
            <GalleryHorizontal />
          </div>
          <div className="hidden md:block">GALLERY</div>
        </div>
      </Link>
      <div className="md:hidden">
        <Link href="/posting">
          <div
            className={cn(
              "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 rounded-full font-semibold p-3",
              currUrl === "/posting"
                ? "bg-primary text-white"
                : "bg-background text-foreground"
            )}
          >
            <div className="md:hidden [&_svg]:h-5 [&_svg]:w-5">
              <Plus />
            </div>
          </div>
        </Link>
      </div>
      <Link href="/album">
        <div
          className={cn(
            "px-6 py-2 text-xs font-bold rounded-full",
            currUrl === "/album"
              ? "bg-primary text-white"
              : "bg-background text-foreground"
          )}
        >
          <div className="md:hidden [&_svg]:h-5 [&_svg]:w-5">
            <GalleryVerticalEnd />
          </div>
          <div className="hidden md:block">ALBUM</div>
        </div>
      </Link>
      <div className="md:hidden">
        <Link href={`/profile/${username}`}>
          <div
            className={cn(
              "px-6 py-2 text-xs font-bold rounded-full",
              pathname.startsWith("/profile")
                ? "bg-primary text-white"
                : "bg-background text-foreground"
            )}
          >
            <div className="md:hidden [&_svg]:h-5 [&_svg]:w-5">
              <UserRound />
            </div>
            <div className="hidden md:block">YOU</div>
          </div>
        </Link>
      </div>
    </div>
  );
}
