"use client";
import { useUserData } from "@/hooks/useUserData";
import SkeletonComment from "../common/skeleton/SkeletonComment";
import FormCreateComment from "../form/FormCreateComment";
import CommentUserComponent from "./CommentUserComponent";

export default function CommentSection({ imageId, totalComment }) {
  const { username } = useUserData();

  return (
    <div>
      <p className="text-base font-semibold leading-none tracking-tight">
        {`Comments ${totalComment}`}
      </p>
      <CommentUserComponent username={username} image_id={imageId} />
      <div className="p-3 bg-background border-t">
        <FormCreateComment image_id={imageId} />
      </div>
    </div>
  );
}
