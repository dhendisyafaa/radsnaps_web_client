"use client";

import { useScrollPosition } from "@/hooks/useScrollPosition";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ButtonPostImage from "../button/ButtonPostImage";
import { Button } from "../ui/button";
import DropdownProfile from "./DropdownProfile";
import NavigationButton from "./NavigationButton";
import { useUserData } from "@/hooks/useUserData";
import SkeletonButtonCredential from "../common/skeleton/SkeletonButtonCredential";

export default function NavbarComponent({
  bgOnScroll = "backdrop-blur-sm bg-background/80",
  customBackground = "bg-background",
  withNavButton = true,
  backHeader = false,
  withMoreDropdown = true,
  withBottomNavbar = true,
  backHeaderTitle = "Title Header",
  heightScroll = 0,
  children,
}) {
  const scrollPosition = useScrollPosition();
  const { status } = useUserData();
  const { back } = useRouter();

  let buttonCredential;
  if (status === "loading") {
    buttonCredential = <SkeletonButtonCredential />;
  } else if (status === "authenticated") {
    buttonCredential = (
      <div className="flex items-center gap-3">
        <ButtonPostImage />
        <DropdownProfile />
      </div>
    );
  } else if (status === "unauthenticated") {
    buttonCredential = (
      <Button className="font-semibold px-8" onClick={() => signIn()}>
        Login
      </Button>
    );
  }
  return (
    <>
      <div
        className={cn(
          `container w-full grid grid-cols-2 justify-between items-center py-5 z-50 fixed top-0`,
          scrollPosition > heightScroll ? bgOnScroll : customBackground,
          withNavButton ? "md:grid-cols-3" : "md:grid-cols-2"
        )}
      >
        {!backHeader ? (
          <p className="text-2xl text-foreground font-medium font-source-serif">
            RadSnaps
          </p>
        ) : (
          <div className="flex items-center gap-2 w-fit">
            <div onClick={() => back()}>
              <ArrowLeft className="w-5 h-5 cursor-pointer" />
            </div>
            <p className="font-semibold">{backHeaderTitle}</p>
          </div>
        )}
        <div className={cn(withNavButton ? "hidden md:block" : "hidden")}>
          <NavigationButton />
        </div>
        {withMoreDropdown && (
          <div className="flex gap-2 items-center justify-end">
            {buttonCredential}
          </div>
        )}
      </div>
      {children}
      {withBottomNavbar && (
        <div className="md:hidden w-full z-50 fixed bottom-1">
          <NavigationButton />
        </div>
      )}
    </>
  );
}
