import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonGallery() {
  return (
    <div className="h-screen w-full flex flex-col gap-5">
      <div className="flex justify-between gap-3">
        <Skeleton className="h-10 w-44" />
        <Skeleton className="h-10 w-full md:w-[30%]" />
      </div>
      <div className="columns-2 gap-3 lg:gap-5 space-y-5 sm:columns-3 lg:columns-4 xl:columns-5">
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
      </div>
    </div>
  );
}
