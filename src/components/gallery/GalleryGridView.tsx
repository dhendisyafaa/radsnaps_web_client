"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLongPress } from "use-long-press";
import ButtonLike from "../button/ButtonLike";
import ButtonSaveToAlbum from "../button/ButtonSaveToAlbum";
import DrawerDialogShare from "../drawer/DrawerDialogShare";

export default function GalleryGridView({
  images,
  withLike = true,
  withButtonSaveToAlbum = true,
  withOverlay = true,
  className,
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageId, setImageId] = useState("");
  const { push } = useRouter();
  const [drawerShare, setDrawerShare] = useState(false);
  const baseUrl = window.location.origin;

  const bind = useLongPress((...params) =>
    handleDrawerShare(params[1].context)
  );

  const handleDrawerShare = (image_id) => {
    setImageId(image_id);
    setDrawerShare(true);
  };

  return (
    <div className={cn(className)}>
      <DrawerDialogShare
        open={drawerShare}
        onOpenChange={setDrawerShare}
        url={`${baseUrl}/gallery/detail/${imageId}`}
      />
      {images.map((image) => {
        return (
          <div key={image.id} {...bind(image.id)} className="flex flex-col">
            <div className="group overflow-hidden relative rounded-lg">
              <div onClick={() => push(`/gallery/detail/${image.id}`)}>
                <Image
                  src={image.image_url}
                  alt={`image ${image.image_name} from owner ${image.owner.username}`}
                  priority
                  width={image.width}
                  height={image.height}
                  quality={75}
                  onLoad={() => setImageLoading(false)}
                  className={cn(
                    "w-full object-cover object-center cursor-pointer transition-all ease-in-out group-hover:scale-105",
                    image.height <= 2000 && "min-h-28",
                    imageLoading
                      ? "grayscale blur-2xl scale-110"
                      : "grayscale-0 blur-0 scale-100"
                  )}
                />
              </div>
              {withOverlay && (
                <>
                  <div className="w-full h-10 bg-gradient-to-t from-[#030712]/80 absolute bottom-0 left-0"></div>
                  <div
                    key={image.id}
                    className="text-xs font-medium text-primary-foreground truncate w-[70%] absolute bottom-3 left-3"
                  >
                    {image.image_title}
                  </div>
                  <div className="flex flex-col gap-3 absolute bottom-3 right-2">
                    {withLike && (
                      <ButtonLike
                        totalLike={image.total_like}
                        isLiked={image.user_liked}
                        imageId={image.id}
                        className={"text-xs [&_svg]:h-6 [&_svg]:w-6 text-white"}
                      />
                    )}
                    {withButtonSaveToAlbum && (
                      <ButtonSaveToAlbum
                        image_id={image.id || image.image_id}
                        saved={image.image_saved}
                        withLabel={false}
                        className={"text-xs [&_svg]:h-6 [&_svg]:w-6 text-white"}
                      />
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
