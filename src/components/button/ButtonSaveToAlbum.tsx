"use client";

import { useAlbumsByUser } from "@/app/api/resolver/albumResolver";
import {
  useDeleteImageInAlbum,
  useImageToAlbum,
} from "@/app/api/resolver/imageResolver";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUserData } from "@/hooks/useUserData";
import { cn } from "@/lib/utils";
import { relativeTimeSuffix } from "@/utils/relativeTime";
import { Bookmark, Check } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import LoadingThreeDoots from "../common/loader/LoadingThreeDoots";
import FormCreateAlbum from "../form/FormCreateAlbum";
import { Button } from "../ui/button";

export default function ButtonSaveToAlbum({
  className,
  image_id,
  withLabel = true,
}) {
  const { user_id, status } = useUserData();
  const [modalSelectAlbum, setModalSelectAlbum] = useState(false);
  const {
    data: albumsUser,
    isLoading,
    isError,
    error,
  } = useAlbumsByUser({ user_id });
  const { mutateAsync: addImageToAlbum, isPending: addingImage } =
    useImageToAlbum();
  const { mutateAsync: deleteImageInAlbum, isPending: deletingImage } =
    useDeleteImageInAlbum();

  if (isLoading) return <p>load...</p>;
  if (isError) return <p>error: {error}</p>;

  const albums = albumsUser.data.data;

  const handleAddImageToAlbum = async (album_id) => {
    try {
      const data = {
        album_id,
        image_id,
      };

      await addImageToAlbum(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDeleteImageInAlbum = async (album_id) => {
    try {
      await deleteImageInAlbum({
        album_id,
        image_id,
      });
    } catch (error) {
      // FIX add toast for if delete image in album failed
      console.log("error", error);
    }
  };

  const imageIsSaved = albums.map((album) =>
    album.images.some((image) => image.image_id === image_id)
  );

  return (
    <div>
      <div
        className={cn(
          `flex flex-col gap-1 text-center items-center text-xs [&_svg]:h-5 [&_svg]:w-5 lg:[&_svg]:h-6 lg:[&_svg]:w-6 cursor-pointer`,
          className
        )}
        onClick={() =>
          status === "unauthenticated" ? signIn() : setModalSelectAlbum(true)
        }
      >
        {imageIsSaved.includes(true) ? (
          <Bookmark className="text-primary fill-primary" />
        ) : (
          <Bookmark className="text-white hover:fill-primary hover:text-primary duration-100 transition-all ease-in-out" />
        )}
        {withLabel ? (
          imageIsSaved.includes(true) ? (
            <p className="text-primary-foreground">Saved</p>
          ) : (
            <p className="text-primary-foreground">Save</p>
          )
        ) : null}
      </div>
      <Dialog open={modalSelectAlbum} onOpenChange={setModalSelectAlbum}>
        <DialogContent className="max-h-[90vh] w-[95%] md:w-xl rounded-lg">
          <DialogHeader>
            <DialogTitle className="flex items-end gap-3">
              Add this images to your album
              {addingImage || deletingImage ? <LoadingThreeDoots /> : null}
            </DialogTitle>
          </DialogHeader>
          <div className="h-full flex flex-col gap-2 max-h-[50vh] overflow-y-auto my-6">
            {albums.length !== 0
              ? albums.map((album) => {
                  const isSaved = album?.images.some(
                    (image) => image.image_id === image_id
                  );
                  return (
                    <div
                      key={album.id}
                      className={cn(
                        "rounded-lg border bg-card text-card-foreground shadow-sm p-1 flex items-center justify-between cursor-pointer select-none group hover:border-primary duration-300",
                        isSaved && "border-primary"
                      )}
                      onClick={() =>
                        !isSaved
                          ? handleAddImageToAlbum(album.id)
                          : handleDeleteImageInAlbum(album.id)
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden">
                          <Image
                            src={
                              album.album_cover ||
                              "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            }
                            alt={`album ${album.id} cover`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <p
                            className={cn(
                              "text-sm font-semibold leading-none tracking-tight",
                              isSaved && "text-primary"
                            )}
                          >
                            {album.album_name}
                          </p>
                          <p className="text-xs text-muted-foreground">{`${album.images.length} images`}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {relativeTimeSuffix(album.updated_at)}
                          </p>
                        </div>
                      </div>
                      {isSaved ? (
                        <Button variant={"ghost"} size={"icon"}>
                          <Check />
                        </Button>
                      ) : null}
                    </div>
                  );
                })
              : "empty state album user"}
          </div>
          <div className="flex justify-between items-center">
            <FormCreateAlbum />
            <Button onClick={() => setModalSelectAlbum(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
