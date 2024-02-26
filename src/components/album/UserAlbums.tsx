import { useAllAlbum } from "@/app/api/resolver/albumResolver";
import EmptyStateComponent from "../common/EmptyStateComponent";
import SkeletonAlbum from "../common/skeleton/SkeletonAlbum";
import AlbumGridView from "./AlbumGridView";

export default function UserAlbums() {
  const { data: dataAlbums, isLoading } = useAllAlbum();
  if (isLoading) return <SkeletonAlbum />;
  const albums = dataAlbums.data.data;

  return albums.length !== 0 ? (
    <AlbumGridView
      albums={albums}
      className={
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      }
    />
  ) : (
    <EmptyStateComponent
      illustration={"/assets/svg/empty-album.svg"}
      titleMessage={"No albums have been created yet"}
      descriptionMessage={"Create an album and photos can be put in it"}
      withButton={false}
    />
  );
}
