import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import NavbarComponent from "@/components/homepage/NavbarComponent";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RadSnaps",
  description: "Framing the World's Wonders in Every Snap.",
};

export default function RootLayout({
  children,
}: // drawer,
{
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <Providers>
          {children}
          {/* {drawer} */}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
