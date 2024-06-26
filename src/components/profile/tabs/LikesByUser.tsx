import { useLikeByUser } from "@/app/api/resolver/likeResolver";
import EmptyStateComponent from "@/components/common/EmptyStateComponent";
import ErrorMessage from "@/components/common/ErrorMessage";
import SkeletonGallery from "@/components/common/skeleton/SkeletonGallery";
import GalleryGridView from "@/components/gallery/GalleryGridView";

export default function LikesByUser({ userId }) {
  const {
    data: likedImages,
    isLoading,
    isError,
    error,
  } = useLikeByUser({
    user_id: userId,
  });
  if (isLoading) return <SkeletonGallery withHeader={false} />;
  if (isError) return <ErrorMessage errMessage={error.message} />;

  const liked = likedImages.data.data;
  return (
    <div>
      {liked.length != 0 ? (
        <GalleryGridView
          images={liked}
          withLike={false}
          withButtonSaveToAlbum={false}
          className={"columns-2 sm:columns-3 gap-3 space-y-3"}
        />
      ) : (
        <EmptyStateComponent
          illustration={"/assets/svg/empty-like.svg"}
          titleMessage={"No favorable images yet"}
          descriptionMessage={"Images you like will be saved here"}
          withButton={false}
        />
      )}
    </div>
  );
}
