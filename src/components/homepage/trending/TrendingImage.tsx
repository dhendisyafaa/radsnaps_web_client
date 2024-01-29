"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import CardImageTrending from "./CardImageTrending";

export default function TrendingImage() {
  const { theme } = useTheme();
  const { push } = useRouter();

  return (
    <>
      <div className="container flex items-center justify-between">
        <p className="w-full text-center md:text-start md:w-4/6 text-sm md:text-lg font-semibold">
          <span className="text-primary">Radsnaps</span> is a global photo
          sharing platform that allows users to explore and share the beauty of
          the world through visual moments. Discover the wonders from around the
          world
        </p>
        <Button
          className="rounded-full font-semibold px-8 md:block hidden"
          onClick={() => push("/gallery?filter=trending")}
        >
          Our Gallery
        </Button>
      </div>
      <div className="overlay-slider relative my-10">
        <CardImageTrending />
        <style jsx>{`
          .overlay-slider {
            overflow: hidden;
          }

          .overlay-slider::before {
            content: url("data:image/svg+xml,%3Csvg width='1626' height='117' viewBox='0 0 1626 117' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_67_26)'%3E%3Cpath d='M814.241 80.9857C1041.3 81.6387 1244.14 59.9841 1606 4L20 4C324.076 63.5717 497.856 78.7763 814.241 80.9857Z' fill='%23${theme !=
            "dark"
              ? "fff"
              : "030712"}'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_67_26' x='0' y='0' width='1626' height='117' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='16'/%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_67_26'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_67_26' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A");
            width: 100%;
            position: absolute;
            top: -5px;
            display: flex;
            justify-content: center;
            z-index: 20;
          }

          .overlay-slider::after {
            content: url("data:image/svg+xml,%3Csvg width='1611' height='118' viewBox='0 0 1611 118' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_67_25)'%3E%3Cpath d='M804.199 40.4603C579.312 39.9389 378.413 61.5707 20.0434 117.405L1590.9 116.514C1289.69 57.4892 1117.56 42.4781 804.199 40.4603Z' fill='%23${theme !=
            "dark"
              ? "fff"
              : "030712"}'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_67_25' x='0.043457' y='0.45105' width='1610.86' height='116.954' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='-20'/%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_67_25'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_67_25' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A");
            width: 100%;
            position: absolute;
            bottom: -5px;
            display: flex;
            justify-content: center;
            z-index: 20;
          }
        `}</style>
      </div>
    </>
  );
}
