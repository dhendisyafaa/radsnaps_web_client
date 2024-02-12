import { Dribbble, Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

export default function FooterComponent() {
  const date = new Date();
  return (
    <div className="hidden w-full container py-10 md:flex items-center justify-between bg-background text-primary-foreground">
      <p className="text-2xl text-foreground font-medium font-source-serif">
        RadSnaps
      </p>
      <div className="hidden md:flex gap-2 text-sm">
        <p>© {date.getFullYear()} Dribbble</p> |{" "}
        <p>
          Developer <span className="text-primary">dhendisyafaa</span>
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Twitter className="text-xs hover:text-primary cursor-pointer duration-100" />
        <Facebook className="text-xs hover:text-primary cursor-pointer duration-100" />
        <Instagram className="text-xs hover:text-primary cursor-pointer duration-100" />
        <Dribbble className="text-xs hover:text-primary cursor-pointer duration-100" />
      </div>
    </div>
  );
}
