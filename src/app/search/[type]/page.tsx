"use client";

import SkeletonAlbum from "@/components/common/skeleton/SkeletonAlbum";
import SkeletonGallery from "@/components/common/skeleton/SkeletonGallery";
import AlbumContentSearch from "@/components/content/AlbumContentSearch";
import ImageContentSearch from "@/components/content/ImageContentSearch";
import SeachBarComponent from "@/components/form/SeachBarComponent";
import { useRouter } from "next/navigation";
import { useContentBySearch } from "../../api/resolver/contentResolver";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getContentBySearch } from "@/app/api/services/contentApi";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export default function SearchPage({ params, searchParams }) {
  const { push } = useRouter();
  const { ref, inView } = useInView();
  const axiosAuth = useAxiosAuth();

  const query = searchParams && searchParams.q ? searchParams.q : "";
  const type = params.type;
  const decodeURI = query.replace(/-/g, " ");

  const {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [`search ${type}`, `${decodeURI}`],
    queryFn: async ({ pageParam = "" }) => {
      const res = await getContentBySearch(axiosAuth, type, {
        search: decodeURI,
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

  useEffect(() => {
    if (inView || hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  const dataContents = () => {
    if (data && data.pages) {
      return data.pages.reduce((prev, { data }) => {
        const images = data.images;
        const albums = data.albums;
        if (type === "image" && images) prev.push(...images);
        if (type === "album" && albums) prev.push(...albums);
        return prev;
      }, []);
    }
  };

  const content = dataContents();

  if (query === null || query === "") return push("/gallery");
  if (isLoading && type === "image") return <SkeletonGallery />;
  if (isLoading && type === "album") return <SkeletonAlbum />;
  if (isError) return <ErrorMessage errMessage={error.message} />;

  let resultSearchContent;
  if (type === "image") {
    resultSearchContent = <ImageContentSearch content={content} />;
  } else if (type === "album") {
    resultSearchContent = <AlbumContentSearch content={content} />;
  }

  return (
    <div className="mb-24">
      <div className="flex w-full md:justify-between justify-end items-center my-6">
        <p className="first-letter:capitalize text-base md:text-2xl font-semibold leading-none tracking-tight hidden md:block">
          {decodeURI}
        </p>
        <SeachBarComponent type={type} />
      </div>
      <div className="text-base md:text-2xl font-semibold leading-none tracking-tight md:hidden mb-6 flex gap-1 w-full">
        <p>Result for:</p>
        <p className="first-letter:capitalize">{decodeURI}</p>
      </div>
      {resultSearchContent}
    </div>
  );
}
