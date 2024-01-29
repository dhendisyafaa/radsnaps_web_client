"use client";
import DetailImage from "@/components/gallery/DetailImage";
import { Drawer } from "@/components/ui/drawer";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DetailImagePage({ params }) {
  const [open, setOpen] = useState(true);
  const { back } = useRouter();

  const handleDrawerClose = () => {
    back();
    setOpen(false);
  };

  return (
    <Drawer open={open} onClose={() => handleDrawerClose()}>
      <DetailImage imageId={params.id} />
    </Drawer>
  );
}
