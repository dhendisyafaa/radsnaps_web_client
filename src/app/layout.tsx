import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

import Providers from "./providers";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RadSnaps",
  description: "Framing the World's Wonders in Every Snap.",
};

axios.defaults.withCredentials = true;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={figtree.className}>
        <NextTopLoader
          color="#6d28d9"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
