"use client";

import GalleryGridView from "@/components/gallery/GalleryGridView";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import { getAllImage } from "../api/services/imageApi";

export default function TestingPage() {
  const { ref, inView } = useInView();

  const {
    isLoading,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: async ({ pageParam = "" }) => {
      const res = await getAllImage({
        filter: "trending",
        limit: 10,
        cursor: pageParam,
      });
      return res.data;
    },
    getNextPageParam: ({ data }) => {
      const images = data.images;
      return images ? images[images.length - 1].id : undefined;
    },
    refetchOnWindowFocus: false,
  });

  React.useEffect(() => {
    if (inView || hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (isLoading) return <p>load...</p>;

  const images = data.pages[0].data.images;

  const dataImages = () => {
    if (data && data.pages) {
      return data.pages.reduce((prev, { data }) => {
        const images = data.images;
        if (images) prev.push(...images);
        return prev;
      }, []);
    }
  };

  const allImages = dataImages();

  return (
    <div>
      <h1>Infinite Loading</h1>
      <GalleryGridView
        images={allImages}
        className={
          "columns-2 gap-3 lg:gap-5 space-y-5 sm:columns-3 lg:columns-4 xl:columns-5"
        }
      />
      <hr />
      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
        </button>
      </div>
      <div>
        {isFetching && !isFetchingNextPage ? "Background Updating..." : null}
      </div>
    </div>
  );
}
