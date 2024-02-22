import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonDetailAlbum() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-10 rounded-full" />
        <Skeleton className="h-4 w-12 rounded-full" />
        <Skeleton className="h-4 w-8 rounded-full" />
        <Skeleton className="h-4 w-14 rounded-full" />
        <Skeleton className="h-4 w-10 rounded-full" />
      </div>
      <Skeleton className="h-6 w-[60%]" />
      <Skeleton className="h-6 w-5/6" />
      <Skeleton className="h-6 w-[40%]" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
