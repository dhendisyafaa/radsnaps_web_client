import { useAllAlbum } from "@/app/api/resolver/albumResolver";
import AlbumGridView from "./AlbumGridView";
import SkeletonAlbum from "../common/skeleton/SkeletonAlbum";

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
    "empty state albums"
  );
}
