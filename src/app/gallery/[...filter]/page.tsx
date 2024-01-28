"use client";

import GalleryGridView from "@/components/gallery/GalleryGridView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Clock4, Flame, Globe, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAllImage } from "../../api/resolver/imageResolver";

export default function GalleryPage() {
  const pathname = usePathname();
  const filterName = pathname.split("/");
  const filterValue = filterName[2];
  const [selectedFilter, setSelectedFilter] = useState(filterValue);
  const { data: images, isLoading, isSuccess } = useAllImage(selectedFilter);
  const { push } = useRouter();

  if (isLoading) return <p>load...</p>;

  const image = images.data.data;

  const handleValueChange = (value) => {
    setSelectedFilter(value);
    push(`/gallery/${value}`);
  };

  const FILTERS = [
    {
      label: "Trending",
      icon: <Flame />,
      href: "/gallery/trending",
    },
    {
      label: "Newest",
      icon: <Sparkles />,
      href: "/gallery/newest",
    },
    {
      label: "Oldest",
      icon: <Sparkles />,
      href: "/gallery/oldest",
    },
  ];

  return (
    <div className="py-10 flex flex-col gap-8">
      <div className="flex justify-between items-center gap-3">
        <ScrollArea className="max-w-[600px] lg:max-w-none hidden md:block">
          <div className="flex items-center">
            {FILTERS.map((filter, index) => (
              <Link
                href={filter.href}
                key={filter.href}
                className={cn(
                  "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                  pathname?.startsWith(filter.href) ||
                    (index === 0 && pathname === "/")
                    ? "bg-muted font-medium text-primary"
                    : "text-muted-foreground"
                )}
              >
                {filter.label}
              </Link>
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
                  FILTERS.find(
                    (filter) => filter.label.toLowerCase() === selectedFilter
                  )?.icon
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {FILTERS.map((filter) => (
                <SelectItem
                  key={filter.label}
                  value={filter.label.toLowerCase()}
                >
                  <div className="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground">
                    {filter.icon}
                    {filter.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-full max-w-72 md:max-w-lg items-center space-x-2">
          <Input type="text" placeholder="Mountain view" />
          <Button type="submit">
            <Search className="w-3 md:w-5" />
          </Button>
        </div>
      </div>
      {image.length != 0 ? (
        <GalleryGridView image={image} />
      ) : (
        <p>Empty state for get all image</p>
      )}
    </div>
  );
}
