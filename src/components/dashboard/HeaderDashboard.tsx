import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { MobileSidebar } from "./MobileSidebar";
import DropdownProfile from "../homepage/DropdownProfile";

export default function HeaderDashboard() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <p className="text-2xl text-foreground font-medium font-source-serif">
            RadSnaps
          </p>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <DropdownProfile />
        </div>
      </nav>
    </div>
  );
}
