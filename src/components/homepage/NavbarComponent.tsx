"use client";

import ButtonPostImage from "../button/ButtonPostImage";
import { ModeToggle } from "../button/ModeToggle";
import PostNewImage from "../gallery/PostNewImage";
import ButtonCredentials from "./ButtonCredentials";
import NavigationButton from "./NavigationButton";

export default function NavbarComponent({ children }) {
  return (
    <>
      <div className="container w-full grid grid-cols-2 md:grid-cols-3 justify-between items-center py-5 z-50 fixed top-0 bg-background">
        <p className="text-2xl text-foreground font-medium font-source-serif">
          RadSnaps
        </p>
        <div className="hidden md:block">
          <NavigationButton />
        </div>
        <div className="flex gap-2 items-center justify-end">
          <ModeToggle />
          <ButtonPostImage />
          <ButtonCredentials />
        </div>
      </div>
      {children}
      <div className="md:hidden w-full z-50 fixed bottom-1">
        <NavigationButton />
      </div>
    </>
  );
}
