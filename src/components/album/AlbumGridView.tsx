import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState } from "react";
import AvatarUserComponent from "../profile/AvatarUserComponent";

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
              src={
                album.album_cover ||
                "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={`cover album id ${album.id}`}
              fill
              onLoad={() => setImageLoading(false)}
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
                  <AvatarUserComponent
                    imageUrl={album.owner.avatar}
                    className="w-5 h-5"
                    withUsername={false}
                    username={album.owner.username}
                  />
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
