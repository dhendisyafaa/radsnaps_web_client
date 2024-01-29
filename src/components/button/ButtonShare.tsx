import { cn } from "@/lib/utils";
import { Share } from "lucide-react";

export default function ButtonShare({ className }) {
  return (
    <div
      className={cn(
        `flex flex-col gap-1 items-center text-[8px] [&_svg]:h-5 [&_svg]:w-5 cursor-pointer`,
        className
      )}
    >
      <Share />
      <p className="text-primary-foreground">Share</p>
    </div>
  );
}
