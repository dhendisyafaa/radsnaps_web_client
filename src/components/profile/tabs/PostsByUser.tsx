import { useImagesByUser } from "@/app/api/resolver/imageResolver";
import EmptyStateComponent from "@/components/common/EmptyStateComponent";
import ErrorMessage from "@/components/common/ErrorMessage";
import SkeletonGallery from "@/components/common/skeleton/SkeletonGallery";
import GalleryGridView from "@/components/gallery/GalleryGridView";
import { useRouter } from "next/navigation";

export default function PostsByUser({ userId }) {
  const {
    data: imagesUser,
    isLoading,
    isError,
    error,
  } = useImagesByUser({
    user_id: userId,
  });
  const { push } = useRouter();

  if (isLoading) return <SkeletonGallery withHeader={false} />;
  if (isError) return <ErrorMessage errMessage={error.message} />;

  const images = imagesUser.data.data;
  return (
    <div>
      {images.length != 0 ? (
        <GalleryGridView
          images={images}
          withLike={false}
          withOverlay={false}
          className={"columns-2 sm:columns-3 gap-3 space-y-3"}
        />
      ) : (
        <EmptyStateComponent
          illustration={"/assets/svg/empty-image.svg"}
          titleMessage={"No uploaded image yet"}
          descriptionMessage={"Please upload your memorable image"}
          withButton={false}
        />
      )}
    </div>
  );
}
