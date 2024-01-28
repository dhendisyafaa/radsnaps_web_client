import { cn } from "@/lib/utils";
import { Bookmark } from "lucide-react";
export default function ButtonSaveToAlbum({ className }) {
  return (
    <div
      className={cn(
        `flex flex-col gap-1 items-center text-[8px] [&_svg]:h-5 [&_svg]:w-5 cursor-pointer`,
        className
      )}
    >
      <Bookmark />
      <p className="text-primary-foreground">Save</p>
    </div>
  );
}
