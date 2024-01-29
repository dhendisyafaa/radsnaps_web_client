import { useImagesByUser } from "@/app/api/resolver/imageResolver";
import GalleryGridView from "@/components/gallery/GalleryGridView";
import React from "react";

export default function PostsByUser({ user_id }) {
  const {
    data: imagesUser,
    isLoading,
    isError,
    error,
  } = useImagesByUser({
    user_id,
  });
  if (isLoading) return <p>load...</p>;
  if (isError) return <p>error: {error}</p>;

  const image = imagesUser.data.data;
  return (
    <div>
      {image.length != 0 ? (
        <GalleryGridView
          image={image}
          withLike={false}
          className={"columns-2 md:columns-3 gap-3 mt-4"}
        />
      ) : (
        "empty state posts"
      )}
    </div>
  );
}
