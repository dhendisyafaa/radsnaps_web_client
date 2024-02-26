import { useTrendingImage } from "@/app/api/resolver/imageResolver";
import SkeletonTrendingImage from "@/components/common/skeleton/SkeletonTrendingImage";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Marquee from "react-fast-marquee";

export default function CardImageTrending() {
  const { data: trendings, isLoading, isError, error } = useTrendingImage();
  const [imageLoading, setImageLoading] = useState(true);

  if (isLoading)
    return (
      <div className="overflow-hidden">
        <SkeletonTrendingImage />
      </div>
    );
  if (isError) return <p>error: {error}</p>;

  const trending = trendings.data.data;

  return trending.length != 0 ? (
    <Marquee
      direction="left"
      speed={30}
      delay={1}
      pauseOnHover={true}
      gradient={true}
      gradientColor={"#030712"}
      autoFill={true}
    >
      {trending.map((item, index) => (
        <Link href={`/gallery/detail/${item.id}`} key={item.id}>
          <div className="ml-4 relative w-[136px] h-[250px] md:w-[236px] md:h-[350px] group cursor-pointer overflow-hidden rounded-3xl">
            <div className="absolute bottom-0 hidden group-hover:flex z-40 w-full h-1/2 flex-col items-start justify-center px-3 bg-gradient-to-t from-black text-white">
              <p className="font-bold text-sm md:text-lg">
                #Trending {index + 1}
              </p>
              <p className="truncate w-full">{item.image_title}</p>
            </div>
            <Image
              src={item.image_url}
              alt={`image ${item.image_name} from owner ${item.owner.username}`}
              fill="true"
              priority
              quality={25}
              onLoad={() => setImageLoading(false)}
              className={cn(
                "object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:z-30 duration-200",
                imageLoading
                  ? "grayscale blur-2xl scale-110"
                  : "grayscale-0 blur-0 scale-100"
              )}
            />
          </div>
        </Link>
      ))}
    </Marquee>
  ) : null;
}
