import { useImagesByUser } from "@/app/api/resolver/imageResolver";
import GalleryGridView from "@/components/gallery/GalleryGridView";

export default function PostsByUser({ userId }) {
  const {
    data: imagesUser,
    isLoading,
    isError,
    error,
  } = useImagesByUser({
    user_id: userId,
  });
  if (isLoading) return <p>load...</p>;
  if (isError) return <p>error: {error}</p>;

  const images = imagesUser.data.data;
  return (
    <div>
      {images.length != 0 ? (
        <GalleryGridView
          images={images}
          withLike={false}
          withOverlay={false}
          className={"columns-3 gap-3 space-y-3"}
        />
      ) : (
        "empty state posts"
      )}
    </div>
  );
}
