import { useImageByAlbum } from "@/app/api/resolver/imageResolver";
import SkeletonAlbum from "../common/skeleton/SkeletonAlbum";
import GalleryGridView from "../gallery/GalleryGridView";
import EmptyStateComponent from "../common/EmptyStateComponent";

export default function ImagesAlbum({ albumId }) {
  const { data: imagesAlbum, isLoading } = useImageByAlbum(albumId);
  if (isLoading)
    return (
      <div className="container py-6">
        <SkeletonAlbum />
      </div>
    );
  const images = imagesAlbum.data.data;

  return (
    <div className="container">
      {images.length !== 0 ? (
        <GalleryGridView
          images={images}
          className={
            "columns-2 gap-3 lg:gap-5 space-y-5 sm:columns-3 lg:columns-4 xl:columns-5"
          }
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
