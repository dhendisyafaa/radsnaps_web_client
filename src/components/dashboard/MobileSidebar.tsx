"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAVSIDEBARITEMS } from "@/constants/data";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="cursor-pointer">
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-1">
                <SidebarNavigation items={NAVSIDEBARITEMS} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
