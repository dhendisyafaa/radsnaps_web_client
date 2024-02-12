import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";

export default function AlbumGridView({
  className,
  albums,
  withDetail = true,
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const { push } = useRouter();
  return (
    <div className={cn(`duration-300`, className)}>
      {albums.map((album) => (
        <div
          key={album.id}
          className="group cursor-pointer rounded-lg"
          onClick={() => push(`/album/${album.id}`)}
        >
          <AspectRatio
            ratio={16 / 9}
            className="bg-muted rounded-md overflow-hidden"
          >
            <Image
              src={album.album_cover}
              alt={`cover album id ${album.id}`}
              fill
              onLoadingComplete={() => setImageLoading(false)}
              quality={5}
              className={cn(
                "object-cover object-center group-hover:scale-105 duration-300",
                imageLoading
                  ? "grayscale blur-2xl scale-110"
                  : "grayscale-0 blur-0 scale-100"
              )}
            />
          </AspectRatio>
          <div className="flex flex-col items-center space-y-3 py-3">
            <p className="text-sm group-hover:underline">{album.album_name}</p>
            {withDetail && (
              <div className="flex text-xs items-center gap-1">
                <div className="flex gap-1 items-center">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p>{album.owner.username}</p>
                </div>
                • <p>{album.images.length} images</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
