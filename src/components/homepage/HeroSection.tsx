import { Aperture, Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import SeachBarComponent from "../form/SeachBarComponent";

export default function HeroSection() {
  return (
    <div className="container min-h-[90vh] flex flex-col justify-center items-center sm:w-[70vw] md:w-[65vw] lg:w-[60vw] w-full">
      <div className="flex items-center gap-2 mb-3">
        <Aperture className="text-primary" />
        <p className="text-base font-medium">Snap, Share, Explore</p>
      </div>
      <p className="font-semibold font-source-serif text-5xl md:text-7xl text-center mb-10">
        Framing the world&apos;s wonders in{" "}
        <span className="text-primary">every snap</span>
      </p>
      <SeachBarComponent className="max-w-lg" />
    </div>
  );
}
