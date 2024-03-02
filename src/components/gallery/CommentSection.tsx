"use client";
import FormCreateComment from "../form/FormCreateComment";
import { useCommentByImage } from "@/app/api/resolver/commentResolver";
import { useAvatarUser } from "@/app/api/resolver/userResolver";
import { useUserData } from "@/hooks/useUserData";
import LoadingThreeDoots from "../common/loader/LoadingThreeDoots";
import AvatarUserComponent from "../profile/AvatarUserComponent";
import CommentUserComponent from "./CommentUserComponent";

export default function CommentSection({ imageId }) {
  const { user_id, username, status } = useUserData();
  const { data: commentsData, isLoading: loadComments } =
    useCommentByImage(imageId);
  const { data: avatarUser, isLoading: loadAvatar } = useAvatarUser(user_id);

  if (loadAvatar || loadComments || status === "loading")
    return (
      <div className="flex justify-center">
        <LoadingThreeDoots />
      </div>
    );

  const comments = commentsData.data.data;
  const avatar = avatarUser.data.data;

  return (
    <div>
      <p className="text-base font-semibold leading-none tracking-tight">
        {`Comments ${comments.length}`}
      </p>
      <CommentUserComponent
        comments={comments}
        avatar={avatar}
        username={username}
      />
      <div className="flex items-center gap-2 p-3 bg-background border-t">
        <AvatarUserComponent
          imageUrl={avatar.avatar}
          withUsername={false}
          username={username}
        />
        <FormCreateComment image_id={imageId} />
      </div>
    </div>
  );
}
