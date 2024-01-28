import { useTrendingImage } from "@/app/api/resolver/imageResolver";
import Image from "next/image";
import Link from "next/link";

export default function CardImageTrending() {
  const { data: trendings, isLoading } = useTrendingImage();

  if (isLoading) return <p>load...</p>;

  const trending = trendings.data.data;

  // FIX check this section
  if (trending.length == 0 || trending == undefined)
    return <p>Cannot get data trending images</p>;

  return (
    <div className="flex overflow-x-auto justify-center gap-5 my-5">
      {trending.map((item, index) => (
        <Link href={`/gallery/detail/${item.id}`} key={item.id}>
          <div className="relative w-[136px] h-[250px] md:w-[236px] md:h-[350px] group cursor-pointer overflow-hidden rounded-3xl">
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
              loading="lazy"
              quality={75}
              className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:z-30 duration-200"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
