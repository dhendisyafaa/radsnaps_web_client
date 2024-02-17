"use client";
import OfficialAlbums from "@/components/album/OfficialAlbums";
import FormCreateAlbum from "@/components/form/FormCreateAlbum";
import GalleryGridView from "@/components/gallery/GalleryGridView";
import PostsByUser from "@/components/profile/tabs/PostsByUser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OfficialContent() {
  const { push } = useRouter();
  return (
    <Accordion type="multiple" collapsible="true" defaultValue="image">
      <AccordionItem value="album">
        <div className="flex justify-between items-center">
          <AccordionTrigger>
            <p className="font-semibold text-foreground mb-2">
              Official albums
            </p>
          </AccordionTrigger>
          <FormCreateAlbum />
        </div>
        <AccordionContent>
          <OfficialAlbums />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="image">
        <div className="flex justify-between items-center">
          <AccordionTrigger>
            <p className="font-semibold text-foreground mb-2">
              Official images
            </p>
          </AccordionTrigger>
          <Button
            variant={"outline"}
            className="flex items-center gap-2"
            onClick={() => push("/posting")}
          >
            <Plus />
            <p className="hidden md:block">Posting</p>
          </Button>
        </div>
        <AccordionContent>
          <PostsByUser />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export const OfficialImages = () => {
  return images.length != 0 ? (
    <GalleryGridView
      images={images}
      className={
        "columns-2 gap-3 lg:gap-5 space-y-5 sm:columns-3 lg:columns-4 xl:columns-5"
      }
    />
  ) : (
    <p>Empty state for get all image</p>
  );
};
