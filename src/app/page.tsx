"use client";

import FooterComponent from "@/components/homepage/FooterComponent";
import HeroSection from "@/components/homepage/HeroSection";
import NavbarComponent from "@/components/homepage/NavbarComponent";
import TrendingImage from "@/components/homepage/trending/TrendingImage";

export default function Home() {
  return (
    <main>
      <NavbarComponent>
        <div className="my-16">
          <HeroSection />
          <TrendingImage />
        </div>
        <FooterComponent />
      </NavbarComponent>
    </main>
  );
}
