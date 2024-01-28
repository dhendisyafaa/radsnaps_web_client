"use client";
import { ImagePlus } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ButtonPostImage() {
  const { data: session } = useSession();
  const { push } = useRouter();

  if (!session) return null;
  return (
    <Button variant={"ghost"} size={"icon"} onClick={() => push("/posting")}>
      <ImagePlus className="h-[1.2rem] w-[1.2rem] text-foreground" />
    </Button>
  );
}
