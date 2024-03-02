"use client";
import DetailImageComponent from "@/components/gallery/DetailImageComponent";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetailImagePage({ params }) {
  const [open, setOpen] = useState(true);
  const { back } = useRouter();

  return (
    <Drawer open={open} onClose={() => back()}>
      <DrawerContent className="h-[95vh]">
        <DetailImageComponent imageId={params.id} />
      </DrawerContent>
    </Drawer>
  );
}
