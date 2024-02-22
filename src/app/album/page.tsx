"use client";
import OfficialAlbums from "@/components/album/OfficialAlbums";
import UserAlbums from "@/components/album/UserAlbums";
import FormCreateAlbum from "@/components/form/FormCreateAlbum";
import SeachBarComponent from "@/components/form/SeachBarComponent";
import NavbarComponent from "@/components/homepage/NavbarComponent";

export default function AlbumPage() {
  return (
    <NavbarComponent>
      <div className="container mt-24 pb-44 flex flex-col gap-8 ">
        <div className="flex justify-between items-center w-full gap-3">
          <FormCreateAlbum />
          <SeachBarComponent endpoint={"album"} />
        </div>
        <div className="flex flex-col gap-3 space-y-3">
          <div className="space-y-3">
            <p className="font-semibold text-foreground border-l-4 border-l-primary pl-2">
              Official albums
            </p>
            <OfficialAlbums />
          </div>
          <div className="space-y-3">
            <p className="font-semibold text-foreground border-l-4 border-l-primary pl-2">
              All albums
            </p>
            <UserAlbums />
          </div>
        </div>
      </div>
    </NavbarComponent>
  );
}
