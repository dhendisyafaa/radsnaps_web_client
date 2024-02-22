"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ButtonLike from "../button/ButtonLike";
import ButtonSaveToAlbum from "../button/ButtonSaveToAlbum";
import DrawerDialogShare from "../drawer/DrawerShareContent";
import { useLongPress } from "use-long-press";

export default function GalleryGridView({
  images,
  withLike = true,
  withButtonShare = true,
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
    <div className={cn(`mb-10`, className)}>
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
                  loading="lazy"
                  width={image.width}
                  height={image.height}
                  quality={75}
                  onLoad={() => setImageLoading(false)}
                  className={cn(
                    "w-full object-cover object-center cursor-pointer transition-all ease-in-out group-hover:scale-105",
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
                        likes={image.likes}
                        image_id={image.id || image.image_id}
                      />
                    )}
                    {withButtonShare && (
                      <ButtonSaveToAlbum
                        image_id={image.id || image.image_id}
                        withLabel={false}
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
// "use client";

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Bookmark, Heart, MoreHorizontal, Share } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Button } from "../ui/button";

// export default function GalleryGridView({ image }) {
//   const { push } = useRouter();
//   const liked = false;
//   return (
//     <div className="columns-2 gap-3 lg:gap-5 space-y-5 sm:columns-3 lg:columns-4 xl:columns-5">
//       {image.map((item) => (
//         <div
//           key={image.id}
//           className="relative group [&_svg]:h-5 [&_svg]:w-5 text-primary-foreground"
//         >
//           <div className="absolute top-3 left-3 group-hover:visible invisible z-30">
// <Link
//   href={`/user/${image.owner.username}`}
//   key={image.id}
//   className="text-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors bg-transparent text-primary-foreground hover:bg-primary"
// >
//   {image.owner.username}
// </Link>
//           </div>
//           <div className="text-xs md:text-base absolute bottom-4 left-3 group-hover:visible invisible z-30">
//             {image.image_title}
//           </div>
//           <div className="flex flex-col gap-3 items-center text-[8px] absolute bottom-3 right-3 group-hover:visible invisible z-30">
// <div className="space-y-0.5 text-center">
//   <Heart />
//   <p className="text-primary-foreground">{image.like}</p>
// </div>
// <DropdownMenu>
//   <DropdownMenuTrigger asChild>
//     <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
//       <span className="sr-only">Open menu</span>
//       <MoreHorizontal className="h-4 w-4" />
//     </Button>
//   </DropdownMenuTrigger>
//   <DropdownMenuContent align="end">
//     <DropdownMenuItem onClick={() => {}}>
//       <Bookmark className={`w-4 h-4`} />
//       Save to album
//     </DropdownMenuItem>
//     <DropdownMenuItem onClick={() => {}}>
//       <Share className={`w-4 h-4`} />
//       Share
//     </DropdownMenuItem>
//   </DropdownMenuContent>
// </DropdownMenu>
//           </div>
//           <div onClick={() => push(`/gallery/detail/${image.id}`)}>
//             <Image
//               src={image.image_url}
//               alt={`image ${image.image_name} from owner ${image.owner.username}`}
//               loading="lazy"
//               width={image.width}
//               height={image.height}
//               quality={75}
//               // placeholder="blur"
//               className="w-full rounded-lg object-cover object-center cursor-pointer duration-200 group-hover:brightness-50"
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
