"use client";

import {
  useCreateLikeByImage,
  useDislikeImage,
} from "@/app/api/resolver/likeResolver";
import { useUserData } from "@/hooks/useUserData";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/formatNumber";
import { Heart, HeartCrack, HeartPulse } from "lucide-react";
import { signIn } from "next-auth/react";
import { useToast } from "../ui/use-toast";
export default function ButtonLike({
  totalLike,
  isLiked,
  imageId,
  className,
  withLikeLength = true,
}) {
  const { mutateAsync: createLike, isPending: loadCreateLike } =
    useCreateLikeByImage();
  const { mutateAsync: dislike, isPending: loadDislike } = useDislikeImage();
  const { user_id, status } = useUserData();
  const { toast } = useToast();

  const handleCreateLike = async () => {
    if (loadCreateLike || loadDislike) return null;
    if (status === "authenticated") {
      if (!isLiked) {
        try {
          await createLike({
            image_id: imageId,
          });
        } catch (error) {
          console.log("error:", error);
          if (error.response) {
            toast({
              variant: "destructive",
              title: `${
                error.response?.data?.message || "Like content failed"
              }`,
            });
          }
        }
      } else {
        try {
          await dislike({
            image_id: imageId,
          });
        } catch (error) {
          console.log("error:", error);
          if (error.response) {
            toast({
              variant: "destructive",
              title: `${
                error.response?.data?.message || "Dislike content failed"
              }`,
            });
          }
        }
      }
    } else {
      signIn();
    }
  };

  return (
    <div
      className={cn(
        `flex flex-col gap-1 items-center cursor-pointer`,
        className
      )}
      onClick={() => handleCreateLike()}
    >
      {loadCreateLike ? (
        <HeartPulse className="text-primary" />
      ) : loadDislike ? (
        <HeartCrack />
      ) : isLiked ? (
        <Heart className="text-primary fill-primary" />
      ) : (
        <Heart className="hover:fill-primary hover:text-primary duration-100 transition-all ease-in-out" />
      )}
      {withLikeLength && <p>{formatNumber(totalLike)}</p>}
    </div>
  );
}
