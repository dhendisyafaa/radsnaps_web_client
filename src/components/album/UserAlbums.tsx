import { getAllAlbum } from "@/app/api/services/albumApi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EmptyStateComponent from "../common/EmptyStateComponent";
import LoadingThreeDoots from "../common/loader/LoadingThreeDoots";
import SkeletonAlbum from "../common/skeleton/SkeletonAlbum";
import AlbumGridView from "./AlbumGridView";
import ObserverLoading from "../common/ObserverLoading";
import ErrorMessage from "../common/ErrorMessage";

export default function UserAlbums() {
  const { ref, inView } = useInView();

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
    queryKey: ["albums"],
    queryFn: async ({ pageParam = "" }) => {
      const res = await getAllAlbum({
        limit: 8,
        cursor: pageParam,
      });
      return res.data;
    },
    getNextPageParam: ({ data }) => {
      const albums = data.albums;
      return albums ? albums[albums.length - 1].id : undefined;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView || hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  if (isLoading) return <SkeletonAlbum />;
  if (isError) return <ErrorMessage errMessage={error.message} />;

  const dataAlbums = () => {
    if (data && data.pages) {
      return data.pages.reduce((prev, { data }) => {
        const albums = data.albums;
        if (albums) prev.push(...albums);
        return prev;
      }, []);
    }
  };

  const allAlbums = dataAlbums();

  return allAlbums.length != 0 ? (
    <>
      <AlbumGridView
        albums={allAlbums}
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
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
    </>
  ) : (
    <EmptyStateComponent
      illustration={"/assets/svg/empty-album.svg"}
      titleMessage={"No albums have been created yet"}
      descriptionMessage={"Create an album and photos can be put in it"}
      withButton={false}
    />
  );
}
