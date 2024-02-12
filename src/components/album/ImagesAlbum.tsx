import { useDetailAlbum } from "@/app/api/resolver/albumResolver";
import GalleryGridView from "../gallery/GalleryGridView";

export default function ImagesAlbum({ album_id }) {
  const { data: imagesAlbum, isLoading } = useDetailAlbum(album_id);
  if (isLoading) return <p>load...</p>;
  const images = imagesAlbum.data.data;

  return (
    <div className="container">
      {images.length !== 0 ? (
        <GalleryGridView
          image={images.images}
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
