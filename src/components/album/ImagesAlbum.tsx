import { useImageByAlbum } from "@/app/api/resolver/imageResolver";
import SkeletonAlbum from "../common/skeleton/SkeletonAlbum";
import GalleryGridView from "../gallery/GalleryGridView";

export default function ImagesAlbum({ album_id }) {
  const { data: imagesAlbum, isLoading } = useImageByAlbum(album_id);
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
        <p>empty state image album</p>
      )}
    </div>
  );
}
