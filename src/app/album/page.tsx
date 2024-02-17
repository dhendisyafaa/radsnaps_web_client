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
          <div>
            <p className="font-semibold text-primary-foreground mb-2">
              Official albums
            </p>
            <FormCreateAlbum />
          </div>
          <SeachBarComponent endpoint={"album"} />
        </div>
        <div className="flex flex-col gap-3">
          <OfficialAlbums />
          <UserAlbums />
        </div>
      </div>
    </NavbarComponent>
  );
}
