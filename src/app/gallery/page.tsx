"use client";

import SkeletonGallery from "@/components/common/skeleton/SkeletonGallery";
import SeachBarComponent from "@/components/form/SeachBarComponent";
import GalleryGridView from "@/components/gallery/GalleryGridView";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILTERIMAGE } from "@/constants/data";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useAllImage } from "../api/resolver/imageResolver";
import { Icons } from "@/components/icons";
import EmptyStateComponent from "@/components/common/EmptyStateComponent";

export default function GalleryPage() {
  const pathname = usePathname();
  const params = useSearchParams();
  const filterValue = params.get("filter");
  const [selectedFilter, setSelectedFilter] = useState(filterValue);
  const {
    data: imagesData,
    isLoading,
    isError,
    error,
  } = useAllImage({
    filter: selectedFilter,
  });
  const { push } = useRouter();

  const currUrl = `${pathname}?${params}`;

  if (isLoading) return <SkeletonGallery />;
  if (isError) return <p>error: {error}</p>;

  const images = imagesData.data.data;

  const handleValueChange = (value) => {
    setSelectedFilter(value);
    push(`/gallery?filter=${value}`);
  };

  return (
    <div className="pb-10 flex flex-col gap-8">
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
                {
                  FILTERIMAGE.find(
                    (filter) => filter.label.toLowerCase() === selectedFilter
                  )?.icon
                }
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
        <SeachBarComponent endpoint={"image"} />
      </div>
      {images.length != 0 ? (
        <GalleryGridView
          images={images}
          className={
            "columns-2 gap-3 lg:gap-5 space-y-5 sm:columns-3 lg:columns-4 xl:columns-5"
          }
        />
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
