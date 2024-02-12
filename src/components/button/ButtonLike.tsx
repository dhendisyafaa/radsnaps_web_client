"use client";

import {
  useCreateLikeByImage,
  useDislikeImage,
} from "@/app/api/resolver/likeResolver";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export default function ButtonLike({ likes, image_id, className }) {
  const { mutateAsync: createLike, isPending: loadCreateLike } =
    useCreateLikeByImage();
  const { mutateAsync: dislike, isPending: loadDislike } = useDislikeImage();
  const { data: session } = useSession();

  function isUserLiked(user_id) {
    return likes.some(
      (like) => like.user_id === user_id || like?.user?.id === user_id
    );
  }

  const isUserLikedImage = isUserLiked(session?.user.user_id);

  const handleCreateLike = async () => {
    if (session) {
      try {
        if (!isUserLikedImage) {
          const dataLike = {
            like: {
              image_id,
              user_id: session?.user.user_id,
            },
            token: session?.user.accessToken,
          };
          await createLike(dataLike);
        } else {
          const likeToDelete = likes.find(
            (like) =>
              like.user_id === session?.user.user_id ||
              like?.user?.id === session?.user.user_id
          );
          if (likeToDelete) {
            const dataDislike = {
              id: likeToDelete.id,
              like: {
                image_id,
                user_id: session?.user.user_id,
              },
              token: session?.user.accessToken,
            };
            await dislike(dataDislike);
          }
        }
      } catch (error) {
        console.log(error);
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
        `flex flex-col gap-1 text-center text-xs [&_svg]:h-5 [&_svg]:w-5 lg:[&_svg]:h-6 lg:[&_svg]:w-6 cursor-pointer`,
        className
      )}
      onClick={() => handleCreateLike()}
    >
      {isUserLikedImage ? (
        <Heart className="text-primary fill-primary" />
      ) : (
        <Heart className="text-white hover:fill-primary hover:text-primary duration-100 transition-all ease-in-out" />
      )}
      <p className="text-primary-foreground hidden sm:block">{lengthLikes}</p>
    </div>
  );
}
