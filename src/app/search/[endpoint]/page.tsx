"use client";

import AlbumGridView from "@/components/album/AlbumGridView";
import SkeletonAlbum from "@/components/common/skeleton/SkeletonAlbum";
import SkeletonGallery from "@/components/common/skeleton/SkeletonGallery";
import SeachBarComponent from "@/components/form/SeachBarComponent";
import GalleryGridView from "@/components/gallery/GalleryGridView";
import { useRouter } from "next/navigation";
import { useContentBySearch } from "../../api/resolver/contentResolver";

export default function SearchPage({ params, searchParams }) {
  const { push } = useRouter();
  const query = searchParams.q;
  const endpoint = params.endpoint;
  const decodeURI = query.replace(/-/g, " ");

  const {
    data: contentSearch,
    isLoading,
    isError,
    error,
  } = useContentBySearch({
    endpoint,
    query: {
      q: decodeURI,
    },
  });

  if (query === null || query === "") return push("/gallery");
  if (isLoading && endpoint === "image") return <SkeletonGallery />;
  if (isLoading && endpoint === "album") return <SkeletonAlbum />;
  if (isError) return <p>error: {error}</p>;

  const contents = contentSearch.data.data;

  let resultSearchContent;
  if (endpoint === "image") {
    resultSearchContent = <ImageContentSearch images={contents} />;
  } else if (endpoint === "album") {
    resultSearchContent = <AlbumContentSearch albums={contents} />;
  }

  return (
    <div className="mb-24">
      <div className="flex w-full md:justify-between justify-end items-center my-6">
        <p className="first-letter:capitalize text-base md:text-2xl font-semibold leading-none tracking-tight hidden md:block">
          {decodeURI}
        </p>
        <SeachBarComponent endpoint={endpoint} />
      </div>
      <div className="text-base md:text-2xl font-semibold leading-none tracking-tight md:hidden mb-6 flex gap-1 w-full">
        <p>Result for:</p>
        <p className="first-letter:capitalize">{decodeURI}</p>
      </div>
      {resultSearchContent}
    </div>
  );
}

export const ImageContentSearch = ({ images }) => {
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
};

export const AlbumContentSearch = ({ albums }) => {
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
};
