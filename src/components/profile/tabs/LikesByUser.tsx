import { useLikeByUser } from "@/app/api/resolver/likeResolver";
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
  if (isLoading) return <p>load...</p>;
  if (isError) return <p>error: {error}</p>;

  const liked = likedImages.data.data;
  return (
    <div>
      {liked.length != 0 ? (
        <GalleryGridView
          images={liked}
          withLike={false}
          className={"columns-3 gap-3 space-y-3"}
        />
      ) : (
        "empty state likes"
      )}
    </div>
  );
}
