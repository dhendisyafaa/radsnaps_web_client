import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonComment() {
  return (
    <div className="flex gap-2 p-6 items-center">
      <Skeleton className="rounded-full h-8 w-8" />
      <div className="space-y-3 w-full">
        <Skeleton className="h-3 w-[60%] rounded-full" />
        <Skeleton className="h-3 w-full rounded-full" />
      </div>
    </div>
  );
}
