import { useAlbumsByUser } from "@/app/api/resolver/albumResolver";
import AlbumGridView from "@/components/album/AlbumGridView";

export default function AlbumsByUser({ userId }) {
  const {
    data: albumsUser,
    isLoading,
    isError,
    error,
  } = useAlbumsByUser({ user_id: userId });

  if (isLoading) return <p>load...</p>;
  if (isError) return <p>error: {error}</p>;

  const albums = albumsUser.data.data;
  return (
    <div>
      {albums.length != 0 ? (
        <AlbumGridView
          albums={albums}
          withDetail={false}
          className={"grid grid-cols-2 gap-3"}
        />
      ) : (
        "empty state posts"
      )}
    </div>
  );
}
