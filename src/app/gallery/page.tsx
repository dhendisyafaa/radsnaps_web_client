"use client";

import EmptyStateComponent from "@/components/common/EmptyStateComponent";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingThreeDoots from "@/components/common/loader/LoadingThreeDoots";
import SkeletonGallery from "@/components/common/skeleton/SkeletonGallery";
import SeachBarComponent from "@/components/form/SeachBarComponent";
import GalleryGridView from "@/components/gallery/GalleryGridView";
import { Icons } from "@/components/icons";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILTERIMAGE } from "@/constants/data";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getAllImage } from "../api/services/imageApi";

export default function GalleryPage() {
  const pathname = usePathname();
  const params = useSearchParams();
  const filterValue = params.get("filter");
  const [selectedFilter, setSelectedFilter] = useState(filterValue);
  const { push, replace } = useRouter();
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
    queryKey: ["images", `${selectedFilter || null}`],
    queryFn: async ({ pageParam = "" }) => {
      const res = await getAllImage(axiosAuth, {
        filter: selectedFilter,
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

  if (isLoading) return <SkeletonGallery />;
  if (isError) return <ErrorMessage errMessage={error.message} />;
  if (filterValue === "") return replace("/gallery");

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

  const currUrl = `${pathname}?${params}`;

  const handleValueChange = (value) => {
    setSelectedFilter(value);
    push(`/gallery?filter=${value}`);
  };

  const IconFilterMobile =
    Icons[
      FILTERIMAGE.find(
        (filter) => filter.label.toLowerCase() === selectedFilter
      )?.icon || "listFilter"
    ];

  return (
    <div className="pb-20 md:pb-10 flex flex-col gap-8">
      <div className="flex justify-between items-center gap-3">
        <ScrollArea className="max-w-[600px] lg:max-w-none hidden md:block">
          <div className="flex items-center">
            {FILTERIMAGE.map((filter, index) => (
              <div
                onClick={() => handleValueChange(filter.label.toLowerCase())}
                key={filter.href}
                className={cn(
                  "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary cursor-pointer",
                  currUrl === filter.href
                    ? "bg-muted font-medium text-primary dark:text-white"
                    : "text-muted-foreground"
                )}
              >
                {filter.label}
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
        <div className="md:hidden">
          <Select
            defaultValue={selectedFilter}
            onValueChange={handleValueChange}
          >
            <SelectTrigger
              className="flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 max-w-44 w-fit"
              aria-label="Select filter"
            >
              <SelectValue placeholder="Select a filter">
                <IconFilterMobile />
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {FILTERIMAGE.map((filter) => {
                const Icon = Icons[filter.icon];
                return (
                  <SelectItem
                    key={filter.label}
                    value={filter.label.toLowerCase()}
                  >
                    <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                      <Icon />
                      {filter.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        <SeachBarComponent type={"image"} />
      </div>
      {allImages.length != 0 ? (
        <div>
          <GalleryGridView
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
          buttonTitle={"Posting image"}
          onClick={() => push(`/posting`)}
        />
      )}
    </div>
  );
}
