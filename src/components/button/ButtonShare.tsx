import { cn } from "@/lib/utils";
import { Share } from "lucide-react";
import DrawerDialogShare from "../drawer/DrawerShareContent";
import { useState } from "react";

export default function ButtonShare({ className }) {
  const [drawerShare, setDrawerShare] = useState(false);
  const baseUrl = window.location;
  return (
    <>
      <DrawerDialogShare
        open={drawerShare}
        onOpenChange={setDrawerShare}
        url={`${baseUrl}`}
      />
      <div
        onClick={() => setDrawerShare(true)}
        className={cn(
          `flex flex-col gap-1 items-center text-[8px] [&_svg]:h-5 [&_svg]:w-5 cursor-pointer`,
          className
        )}
      >
        <Share />
        <p className="text-primary-foreground">Share</p>
      </div>
    </>
  );
}
