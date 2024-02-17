"use client";
import { useCommentByImage } from "@/app/api/resolver/commentResolver";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { relativeTimeWithoutSuffix } from "@/utils/relativeTime";
import { useMutationState } from "@tanstack/react-query";
import FormCreateComment from "../form/FormCreateComment";
import { ScrollArea } from "../ui/scroll-area";

export default function CommentSection({ imageId }) {
  const { data: comments, isLoading } = useCommentByImage(imageId);

  const variables = useMutationState<string>({
    filters: { mutationKey: ["addComment"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  if (isLoading) return <p>load...</p>;
  const comment = comments.data.data;

  return (
    <div>
      <p className="text-base font-semibold leading-none tracking-tight">
        {`Comments ${comment.length}`}
      </p>
      <ScrollArea className="my-3 h-[80vh]">
        {variables[0] && (
          <div className="flex items-start gap-2 p-4 w-full opacity-50">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex gap-2 items-center">
                <p className="text-lg font-semibold leading-none tracking-tight">
                  username
                </p>
                <p className="text-xs text-muted-foreground">now</p>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {variables[0].comment?.comment_content}
              </p>
            </div>
          </div>
        )}
        {comment.length !== 0 ? (
          comment.map((item) => (
            <div key={item.id} className="flex items-start gap-2 p-4 w-full">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex gap-2 items-center">
                  <p className="text-lg font-semibold leading-none tracking-tight">
                    {item.user.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {relativeTimeWithoutSuffix(item.created_at)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {item.comment_content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            No comments yet
          </p>
        )}
      </ScrollArea>
      <div className="flex items-center gap-2 p-3 bg-background border-t">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <FormCreateComment image_id={imageId} />
      </div>
    </div>
  );
}
