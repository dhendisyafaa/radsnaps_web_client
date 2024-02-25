"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { relativeTimeWithoutSuffix } from "@/utils/relativeTime";
import { useMutationState } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";
import ButtonReportIssue from "../button/ButtonReportIssue";
import AvatarUserComponent from "../profile/AvatarUserComponent";
import { ScrollArea } from "../ui/scroll-area";

export default function CommentUserComponent({ comments, avatar, username }) {
  const variables = useMutationState<string>({
    filters: { mutationKey: ["addComment"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  return (
    <ScrollArea className="my-3 h-[50vh]">
      {variables[0] && (
        <div className="flex items-start gap-2 p-4 w-full opacity-50">
          <AvatarUserComponent
            imageUrl={avatar}
            username={username}
            withUsername={false}
          />
          <div>
            <div className="flex gap-2 items-center">
              <p className="text-lg font-semibold leading-none tracking-tight">
                {username}
              </p>
              <p className="text-xs text-muted-foreground">now</p>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {variables[0].comment_content}
            </p>
          </div>
        </div>
      )}
      {comments.length !== 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-2 p-4 w-full">
            <AvatarUserComponent
              username={comment.user.username}
              imageUrl={comment.user.avatar}
              withUsername={false}
            />
            <div className="flex justify-between items-start w-full">
              <div>
                <div className="flex gap-2 items-center">
                  <p className="text-lg font-semibold leading-none tracking-tight">
                    {comment.user.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {relativeTimeWithoutSuffix(comment.created_at)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {comment.comment_content}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="[&_svg]:w-4 [&_svg]:h-4">
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-3">
                  <ButtonReportIssue
                    content_id={comment.id}
                    content_type={"comment"}
                    flexColLayout={false}
                    className={"[&_svg]:w-6 [&_svg]:h-6 text-sm"}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-muted-foreground text-center">
          No comments yet
        </p>
      )}
    </ScrollArea>
  );
}
