"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const { push } = useRouter();
  return (
    <div className="relative grid place-items-center h-screen w-full">
      <Image
        src="/assets/image/login-bg.jpg"
        fill
        quality={1}
        alt="not-found-page"
        className="object-cover z-10"
      />
      <div className="container h-screen w-full flex flex-col justify-center items-center z-30 text-center space-y-3 bg-black/60">
        <p className="font-bold text-4xl">Page not found</p>
        <p className="font-medium text-lg">
          Hmm, the page you were looking for doesn’t seem to exist anymore.
        </p>
        <Button onClick={() => push("/gallery")}>Back to Radsnaps</Button>
      </div>
    </div>
  );
}
