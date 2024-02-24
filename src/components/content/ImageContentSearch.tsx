import React from "react";
import GalleryGridView from "../gallery/GalleryGridView";

export default function ImageContentSearch({ images }) {
  return images != 0 ? (
    <GalleryGridView
      images={images}
      className={
        "columns-2 gap-3 lg:gap-5 space-y-5 sm:columns-3 lg:columns-4 xl:columns-5"
      }
    />
  ) : (
    "empty state when search empty"
  );
}
