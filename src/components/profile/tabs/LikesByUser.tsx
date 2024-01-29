import { useLikeByUser } from "@/app/api/resolver/likeResolver";
import GalleryGridView from "@/components/gallery/GalleryGridView";

export default function LikesByUser({ user_id }) {
  const {
    data: likedImages,
    isLoading,
    isError,
    error,
  } = useLikeByUser({
    user_id,
  });
  if (isLoading) return <p>load...</p>;
  if (isError) return <p>error: {error}</p>;

  const liked = likedImages.data.data;
  return (
    <div>
      {liked.length != 0 ? (
        <GalleryGridView
          image={liked}
          withLike={false}
          className={"columns-2 md:columns-3 gap-3 mt-4"}
        />
      ) : (
        "empty state likes"
      )}
    </div>
  );
}
