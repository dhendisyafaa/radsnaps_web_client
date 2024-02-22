// import Header from "@/components/layout/header";
// import Sidebar from "@/components/layout/sidebar";
import HeaderDashboard from "@/components/dashboard/HeaderDashboard";
import SidebarComponent from "@/components/dashboard/SidebarComponent";
import NavbarComponent from "@/components/homepage/NavbarComponent";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radsnaps | Dashboard",
  description: "Framing the World's Wonders in Every Snap.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderDashboard />
      <div className="flex h-screen overflow-hidden">
        <SidebarComponent />
        <main className="w-full pt-20 container">
          <ScrollArea className="h-full p-3">
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Hi,{" "}
                <span className="bg-gradient-to-br from-purple-950 via-purple-600 to-purple-950 bg-clip-text text-transparent">
                  Snaps Admin
                </span>
              </h2>
              {children}
            </div>
          </ScrollArea>
        </main>
      </div>
    </>
  );
}
