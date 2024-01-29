"use client";

import { cn } from "@/lib/utils";
import { useScrollPosition } from "@/utils/useScrollPosition";
import { signIn, useSession } from "next-auth/react";
import ButtonPostImage from "../button/ButtonPostImage";
import { Button } from "../ui/button";
import DropdownProfile from "./DropdownProfile";
import NavigationButton from "./NavigationButton";

export default function NavbarComponent({ children }) {
  const scrollPosition = useScrollPosition();
  const { data: session } = useSession();

  return (
    <>
      <div
        className={cn(
          `container w-full grid grid-cols-2 md:grid-cols-3 justify-between items-center py-5 z-50 fixed top-0`,
          scrollPosition > 0
            ? "backdrop-blur-sm bg-background/80"
            : "bg-background"
        )}
      >
        <p className="text-2xl text-foreground font-medium font-source-serif">
          RadSnaps
        </p>
        <div className="hidden md:block">
          <NavigationButton />
        </div>
        <div className="flex gap-2 items-center justify-end">
          {session ? (
            <div className="flex items-center gap-2">
              <ButtonPostImage />
              <DropdownProfile />
            </div>
          ) : (
            <Button
              className="rounded-full font-semibold px-8"
              onClick={() => signIn()}
            >
              Login
            </Button>
          )}
        </div>
      </div>
      {children}
      <div className="md:hidden w-full z-50 fixed bottom-1">
        <NavigationButton />
      </div>
    </>
  );
}
