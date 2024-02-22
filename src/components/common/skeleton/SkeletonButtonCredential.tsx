import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonButtonCredential() {
  return (
    <div className="flex items-center gap-1">
      <Skeleton className="h-6 w-6 rounded-full" />
      <Skeleton className="h-6 w-6 rounded-full" />
      <Skeleton className="h-6 w-6 rounded-full" />
    </div>
  );
}
