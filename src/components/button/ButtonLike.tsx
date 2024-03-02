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
  likes,
  image_id,
  className,
  withLikeLength = true,
}) {
  const { mutateAsync: createLike, isPending: loadCreateLike } =
    useCreateLikeByImage();
  const { mutateAsync: dislike, isPending: loadDislike } = useDislikeImage();
  const { user_id, status } = useUserData();
  const { toast } = useToast();

  const isUserLiked = () => {
    return likes.some(
      (like) =>
        like.user ? like.user.id === user_id : like.user_id === user_id
      // (like) => like.user_id === user_id || like?.user?.id === user_id
    );
  };

  const isUserLikedImage = isUserLiked();

  const handleCreateLike = async () => {
    if (loadCreateLike || loadDislike) return null;
    if (status === "authenticated") {
      try {
        if (!isUserLikedImage) {
          await createLike({
            image_id,
            user_id: user_id,
          });
        } else {
          const likeToDelete = likes.find((like) =>
            like.user ? like.user.id === user_id : like.user_id === user_id
          );
          if (likeToDelete) {
            await dislike({
              id: likeToDelete.id,
              image_id,
            });
          }
        }
      } catch (error) {
        if (error.response) {
          toast({
            variant: "destructive",
            title: `${error.response?.data?.message || "Like content failed"}`,
          });
        }
      }
    } else {
      signIn();
    }
  };

  let lengthLikes;

  if (loadCreateLike) {
    lengthLikes = likes.length + 1;
  } else if (loadDislike) {
    lengthLikes = likes.length - 1;
  } else {
    lengthLikes = likes.length;
  }

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
      ) : isUserLikedImage ? (
        <Heart className="text-primary fill-primary" />
      ) : (
        <Heart className="hover:fill-primary hover:text-primary duration-100 transition-all ease-in-out" />
      )}

      {withLikeLength && <p>{formatNumber(lengthLikes)}</p>}
    </div>
  );
}
