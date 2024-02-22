import { useAlbumsByUser } from "@/app/api/resolver/albumResolver";
import AlbumGridView from "@/components/album/AlbumGridView";
import { useUserData } from "@/hooks/useUserData";

export default function AlbumsByUser() {
  const { user_id } = useUserData();

  const {
    data: albumsUser,
    isLoading,
    isError,
    error,
  } = useAlbumsByUser({ user_id });

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
