import { useAlbumsByUser } from "@/app/api/resolver/albumResolver";
import AlbumGridView from "@/components/album/AlbumGridView";
import EmptyStateComponent from "@/components/common/EmptyStateComponent";
import ErrorMessage from "@/components/common/ErrorMessage";
import SkeletonGallery from "@/components/common/skeleton/SkeletonGallery";

export default function AlbumsByUser({ userId }) {
  const {
    data: albumsUser,
    isLoading,
    isError,
    error,
  } = useAlbumsByUser({ user_id: userId });

  if (isLoading) return <SkeletonGallery withHeader={false} />;
  if (isError) return <ErrorMessage errMessage={error.message} />;

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
        <EmptyStateComponent
          illustration={"/assets/svg/empty-album.svg"}
          titleMessage={"No albums have been created yet"}
          descriptionMessage={"Create an album and photos can be put in it"}
          withButton={false}
        />
      )}
    </div>
  );
}
