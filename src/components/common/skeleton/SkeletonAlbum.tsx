import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonAlbum() {
  return (
    <div>
      <Skeleton className="h-10 w-44 mb-3" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
      </div>
    </div>
  );
}
