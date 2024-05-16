import { getImageByAlbum } from "@/app/api/services/imageApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EmptyStateComponent from "../common/EmptyStateComponent";
import ErrorMessage from "../common/ErrorMessage";
import LoadingThreeDoots from "../common/loader/LoadingThreeDoots";
import SkeletonAlbum from "../common/skeleton/SkeletonAlbum";
import GalleryGridView from "../gallery/GalleryGridView";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export default function ImagesAlbum({ albumId }) {
  const { ref, inView } = useInView();
  const axiosAuth = useAxiosAuth();

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
    queryKey: ["image-album", albumId],
    queryFn: async ({ pageParam = "" }) => {
      const res = await getImageByAlbum(axiosAuth, albumId, {
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

  if (isLoading)
    return (
      <div className="container py-6">
        <SkeletonAlbum />
      </div>
    );

  if (isError) return <ErrorMessage errMessage={error.message} />;

  return (
    <div className="container pb-20 md:pb-10">
      {allImages.length !== 0 ? (
        <div>
          <GalleryGridView
            withButtonSaveToAlbum={false}
            images={allImages}
            className={
              "columns-2 gap-3 lg:gap-5 space-y-5 sm:columns-3 lg:columns-4 xl:columns-5"
            }
          />
          <div ref={ref} className="my-6">
            {isFetchingNextPage ? (
              <div className="w-full rounded-full grid place-items-center p-3 text-xs border border-border">
                <LoadingThreeDoots />
              </div>
            ) : hasNextPage ? (
              <p className="text-xs text-muted-foreground text-center">
                Load Newer
              </p>
            ) : (
              <p className="text-xs text-muted-foreground text-center">
                Nothing more to load
              </p>
            )}
          </div>
        </div>
      ) : (
        <EmptyStateComponent
          illustration={"/assets/svg/empty-image.svg"}
          titleMessage={"No uploaded image yet"}
          descriptionMessage={"Please upload your memorable image"}
          withButton={false}
        />
      )}
    </div>
  );
}
