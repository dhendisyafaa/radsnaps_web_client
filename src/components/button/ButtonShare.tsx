import { cn } from "@/lib/utils";
import { Share, Share2 } from "lucide-react";
import DrawerDialogShare from "../drawer/DrawerDialogShare";
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
          `flex flex-col gap-1 items-center cursor-pointer`,
          className
        )}
      >
        <Share2 />
        <p className="text-primary-foreground">Share</p>
      </div>
    </>
  );
}
