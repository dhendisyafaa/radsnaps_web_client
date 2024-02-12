import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonTrendingImage() {
  return (
    <div className="flex gap-3 overflow-x-auto min-w-fit">
      <Skeleton className="w-[136px] h-[250px] md:w-[236px] md:h-[350px]" />
      <Skeleton className="w-[136px] h-[250px] md:w-[236px] md:h-[350px]" />
      <Skeleton className="w-[136px] h-[250px] md:w-[236px] md:h-[350px]" />
      <Skeleton className="w-[136px] h-[250px] md:w-[236px] md:h-[350px]" />
      <Skeleton className="w-[136px] h-[250px] md:w-[236px] md:h-[350px]" />
      <Skeleton className="w-[136px] h-[250px] md:w-[236px] md:h-[350px]" />
      <Skeleton className="w-[136px] h-[250px] md:w-[236px] md:h-[350px]" />
    </div>
  );
}
