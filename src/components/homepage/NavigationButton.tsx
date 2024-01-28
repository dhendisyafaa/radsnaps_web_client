"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Album,
  Bookmark,
  GalleryHorizontal,
  GalleryVerticalEnd,
  Home,
  Save,
} from "lucide-react";

export default function NavigationButton() {
  const NAVIGATION = [
    { name: "HOME", link: "/", icon: <Home /> },
    { name: "GALLERY", link: "/gallery/trending", icon: <GalleryHorizontal /> },
    { name: "ALBUM", link: "/album", icon: <GalleryVerticalEnd /> },
    { name: "FAVOURITE", link: "/favourite", icon: <Bookmark /> },
  ];

  const pathname = usePathname();

  return (
    <div className="flex gap-3 p-2 mx-1 md:mx-0 rounded-full items-center justify-around shadow-[0px_-1px_30px_0px_#7c3aed8b] md:shadow-md min-w-max bg-background">
      {NAVIGATION.map((nav, index) => {
        const isGalleryPath = pathname.startsWith("/gallery");

        const isGalleryActive =
          isGalleryPath &&
          (pathname === nav.link ||
            (pathname.startsWith("/gallery/") &&
              nav.link === "/gallery/trending"));

        return (
          <Link key={index} href={nav.link}>
            <div
              className={cn(
                `px-6 py-2 text-xs font-bold rounded-full`,
                isGalleryActive || pathname === nav.link
                  ? "bg-primary text-white"
                  : "bg-background text-foreground"
              )}
            >
              <div className="md:hidden [&_svg]:h-5 [&_svg]:w-5">
                {nav.icon}
              </div>
              <div className="hidden md:block">{nav.name}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
