"use client";

import { useImagesBySearch } from "@/app/api/resolver/imageResolver";
import SeachBarComponent from "@/components/form/SeachBarComponent";
import GalleryGridView from "@/components/gallery/GalleryGridView";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const params = useSearchParams();
  const q = params.get("q");
  const decodeURI = q.replace(/-/g, " ");
  const {
    data: images,
    isLoading,
    isError,
    error,
  } = useImagesBySearch({
    q: decodeURI,
  });

  if (isLoading) return <p>load...</p>;
  if (isError) return <p>error: {error}</p>;

  const image = images.data.data;

  return (
    <div>
      <div className="flex w-full md:justify-between justify-end items-center my-6 p-3">
        <p className="first-letter:capitalize text-base md:text-2xl font-semibold leading-none tracking-tight hidden md:block">
          {decodeURI}
        </p>
        <SeachBarComponent />
      </div>
      <div className="text-base md:text-2xl font-semibold leading-none tracking-tight md:hidden mb-6 flex gap-1">
        <p>Result for:</p>
        <p className="first-letter:capitalize">{decodeURI}</p>
      </div>
      {image != 0 ? (
        <GalleryGridView
          image={image}
          className={
            "columns-2 gap-3 lg:gap-5 space-y-5 sm:columns-3 lg:columns-4 xl:columns-5"
          }
        />
      ) : (
        "empty state when search empty"
      )}
    </div>
  );
}
