"use client";
import { useDetailAlbum } from "@/app/api/resolver/albumResolver";
import ImagesAlbum from "@/components/album/ImagesAlbum";
import ButtonReportIssue from "@/components/button/ButtonReportIssue";
import SkeletonDetailAlbum from "@/components/common/skeleton/SkeletonDetailAlbum";
import AlertDeleteAlbum from "@/components/dialog/AlertDeleteAlbum";
import FormEditAlbum from "@/components/form/FormEditAlbum";
import NavbarComponent from "@/components/homepage/NavbarComponent";
import AvatarUserComponent from "@/components/profile/AvatarUserComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUserData } from "@/hooks/useUserData";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DetailAlbumPage({ params }) {
  const { data: detailAlbum, isLoading } = useDetailAlbum(params.id);
  const { back } = useRouter();
  const { user_id, status } = useUserData();

  if (isLoading)
    return (
      <NavbarComponent>
        <div className="mt-28 px-12 md:px-44 container">
          <SkeletonDetailAlbum />
        </div>
      </NavbarComponent>
    );
  const album = detailAlbum.data.data;
  const topFiveTags = album.tags.slice(0, 5);

  return (
    <NavbarComponent
      customBackground="bg-transparent"
      bgOnScroll="backdrop-blur-sm bg-gradient-to-b from-background/75"
      withNavButton={false}
      withMoreDropdown={false}
    >
      <div className="relative h-[80vh]">
        <AspectRatio ratio={16 / 9} className="bg-muted h-[80vh]">
          <div className="absolute top-0 left-0 z-10 w-full h-[80vh] bg-gradient-to-b from-background/75 via-background/50 to-background"></div>
          <Image
            src={
              album.album_cover ||
              "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={`album cover from album id ${album.id}`}
            fill
            quality={5}
            className="object-cover"
          />
        </AspectRatio>
        <div className="flex flex-col space-y-5 md:px-20 w-full h-full absolute top-0 left-0 justify-center container z-10">
          <div
            className="flex items-center gap-2 cursor-pointer mb-6 group w-fit"
            onClick={() => back()}
          >
            <div className="rounded-full p-1 bg-background/50 group-hover:bg-background/30">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <p className="text-foreground font-semibold">Back</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {topFiveTags !== "" &&
              topFiveTags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
          </div>
          <div>
            <p className="font-bold text-3xl md:text-4xl">{album.album_name}</p>
            <p className="text-sm md:text-lg md:w-[80%]">{album.description}</p>
          </div>
          <div className="flex items-end justify-between">
            <div onClick={() => {}}>
              <p className="font-semibold text-sm mb-2">Created by</p>
              <div className="flex gap-2 items-center">
                <AvatarUserComponent
                  imageUrl={album.owner.avatar}
                  withUsername={false}
                  username={album.owner.username}
                />
                <p>{album.owner.username}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {album.owner.id === user_id ? (
                <>
                  {status === "loading" ? (
                    <Skeleton className="w-24 h-10 rounded-full" />
                  ) : (
                    <>
                      <FormEditAlbum data={album} />
                      <AlertDeleteAlbum
                        album_id={album.id}
                        album_name={album.album_name}
                      />
                    </>
                  )}
                </>
              ) : null}
              <ButtonReportIssue
                withTitle={false}
                content_type={"album"}
                content_id={album.id}
                className={
                  "bg-transparent rounded-full p-1 border border-muted-foreground hover:bg-white/50 w-8 h-8 shadow-sm [&_svg]:h-4 [&_svg]:w-4 grid place-items-center"
                }
              />
            </div>
          </div>
        </div>
      </div>
      <ImagesAlbum albumId={params.id} />
    </NavbarComponent>
  );
}
