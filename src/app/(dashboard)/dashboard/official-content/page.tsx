"use client";
import OfficialAlbums from "@/components/album/OfficialAlbums";
import FormCreateAlbum from "@/components/form/FormCreateAlbum";
import PostsByUser from "@/components/profile/tabs/PostsByUser";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useUserData } from "@/hooks/useUserData";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OfficialContent() {
  const { user_id } = useUserData();
  const { push } = useRouter();
  return (
    <Accordion type="multiple">
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
          <PostsByUser userId={user_id} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
