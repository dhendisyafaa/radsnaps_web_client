import { useDetailImage } from "@/app/api/resolver/imageResolver";
import React from "react";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import CommentSection from "./CommentSection";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import ButtonLike from "../button/ButtonLike";
import ButtonSaveToAlbum from "../button/ButtonSaveToAlbum";
import ButtonShare from "../button/ButtonShare";

export default function DetailImage({ imageId }) {
  const { data: image, isLoading } = useDetailImage(imageId);

  if (isLoading) return <p>load...</p>;
  const detailImage = image.data.data;

  return (
    <DrawerContent className="h-[95vh]">
      <div className="p-4 md:p-16 gap-5 grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
        <Image
          src={detailImage.image_url}
          alt={`image ${detailImage.image_name} from owner ${detailImage.owner.username}`}
          loading="lazy"
          width={detailImage.width}
          height={detailImage.height}
          className="w-full rounded-lg object-cover object-center cursor-pointer duration-200 group-hover:brightness-75"
        />
        <div>
          <div className="space-y-5 mb-5">
            <p className="text-2xl font-semibold leading-none tracking-tight">
              {detailImage.image_title}
            </p>
            <div>
              <div className="flex justify-between items-center">
                <p className="text-base font-semibold leading-none tracking-tight">
                  Description
                </p>
                <div className="flex items-center justify-end gap-3 p-3">
                  <ButtonLike
                    likes={detailImage.like}
                    image_id={detailImage.id}
                    className={"md:text-xs md:[&_svg]:h-6 md:[&_svg]:w-6"}
                  />
                  <ButtonSaveToAlbum
                    className={"md:text-xs md:[&_svg]:h-6 md:[&_svg]:w-6"}
                  />
                  <ButtonShare
                    className={"md:text-xs md:[&_svg]:h-6 md:[&_svg]:w-6"}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {detailImage.image_description}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>{detailImage.owner.username}</p>
              </div>
              <Button size="sm">View profile</Button>
            </div>
          </div>
          <CommentSection imageId={imageId} />
        </div>
      </div>
    </DrawerContent>
  );
}
