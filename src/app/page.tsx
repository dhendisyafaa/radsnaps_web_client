"use client";

import FooterComponent from "@/components/homepage/FooterComponent";
import HeroSection from "@/components/homepage/HeroSection";
import NavbarComponent from "@/components/homepage/NavbarComponent";
import UploadYourImage from "@/components/homepage/UploadYourImage";
import TrendingImage from "@/components/homepage/trending/TrendingImage";

export default function Home() {
  return (
    <main>
      <NavbarComponent customBackground="bg-transparent">
        <div className="my-16">
          <HeroSection />
          <TrendingImage />
          <UploadYourImage />
        </div>
        <FooterComponent />
      </NavbarComponent>
    </main>
  );
}
