"use client";
import { useCommentByImage } from "@/app/api/resolver/commentResolver";
import { useUserData } from "@/hooks/useUserData";
import SkeletonComment from "../common/skeleton/SkeletonComment";
import FormCreateComment from "../form/FormCreateComment";
import CommentUserComponent from "./CommentUserComponent";

export default function CommentSection({ imageId }) {
  const { user_id, username, status } = useUserData();
  const { data: commentsData, isLoading: loadComments } =
    useCommentByImage(imageId);

  if (loadComments || status === "loading") return <SkeletonComment />;

  const comments = commentsData.data.data;

  return (
    <div>
      <p className="text-base font-semibold leading-none tracking-tight">
        {`Comments ${comments.length}`}
      </p>
      <CommentUserComponent comments={comments} username={username} />
      <div className="p-3 bg-background border-t">
        <FormCreateComment image_id={imageId} />
      </div>
    </div>
  );
}
