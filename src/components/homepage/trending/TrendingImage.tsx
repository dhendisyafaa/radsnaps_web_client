"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import CardImageTrending from "./CardImageTrending";
import Link from "next/link";

export default function TrendingImage() {
  const { theme } = useTheme();
  const { push } = useRouter();

  return (
    <div className="mb-24">
      <div className="container flex items-center justify-between">
        <div className="text-center md:text-start">
          <p className="font-semibold font-source-serif mb-3 text-2xl">
            Discover the wonders from around the world
          </p>
          <p className="w-full md:w-4/6 text-sm md:text-base font-semibold">
            <span className="text-primary">Radsnaps</span> is a global photo
            sharing platform that allows users to explore and share the beauty
            of the world through visual moments.
          </p>
        </div>
        <Link href={"/gallery"}>
          <p
            className="bg-primary text-primary-foreground
           font-semibold rounded-full py-2 px-8 md:block hidden"
          >
            Our Gallery
          </p>
        </Link>
      </div>
      <div className="overlay-slider relative mt-8">
        <CardImageTrending />
      </div>
    </div>
  );
}
