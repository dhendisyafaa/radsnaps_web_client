import React from "react";
import AlbumGridView from "../album/AlbumGridView";

export default function AlbumContentSearch({ albums }) {
  return albums.length !== 0 ? (
    <AlbumGridView
      albums={albums}
      className={
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      }
    />
  ) : (
    "empty state albums"
  );
}
