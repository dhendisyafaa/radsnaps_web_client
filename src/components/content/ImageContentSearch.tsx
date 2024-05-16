import React from "react";
import GalleryGridView from "../gallery/GalleryGridView";
import EmptyStateComponent from "../common/EmptyStateComponent";

export default function ImageContentSearch({ content }) {
  return content != 0 ? (
    <GalleryGridView
      images={content}
      className={
        "columns-2 gap-3 lg:gap-5 space-y-5 sm:columns-3 lg:columns-4 xl:columns-5"
      }
    />
  ) : (
    <EmptyStateComponent
      illustration={"/assets/svg/empty-search.svg"}
      titleMessage={"No search result you requested"}
      descriptionMessage={"Please search using other keywords"}
      withButton={false}
    />
  );
}
