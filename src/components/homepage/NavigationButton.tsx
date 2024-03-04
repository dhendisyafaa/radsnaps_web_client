"use client";

import { useUserData } from "@/hooks/useUserData";
import { cn } from "@/lib/utils";
import {
  GalleryHorizontal,
  GalleryVerticalEnd,
  Home,
  Plus,
  UserRound,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavigationButton() {
  const pathname = usePathname();
  const params = useSearchParams();
  const filterValue = params.get("filter");
  const { username, status } = useUserData();

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
      <Link href="/gallery">
        <div
          className={cn(
            "px-6 py-2 text-xs font-bold rounded-full",
            currUrl === "/gallery?filter=trending" ||
              currUrl === "/gallery?filter=newest" ||
              currUrl === "/gallery"
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
              "rounded-full font-semibold p-3",
              currUrl === "/posting"
                ? "bg-primary text-white"
                : "bg-primary md:bg-background text-foreground"
            )}
          >
            <div className="md:hidden [&_svg]:h-5 [&_svg]:w-5 text-white">
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
        <Link
          href={
            status === "unauthenticated"
              ? "/auth/login"
              : `/profile/${username}`
          }
        >
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
