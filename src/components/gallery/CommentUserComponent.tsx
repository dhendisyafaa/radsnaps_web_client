"use client";
import { getCommentByImage } from "@/app/api/services/commentApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { relativeTimeWithoutSuffix } from "@/utils/relativeTime";
import { useInfiniteQuery, useMutationState } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ButtonReportIssue from "../button/ButtonReportIssue";
import ErrorMessage from "../common/ErrorMessage";
import LoadingThreeDoots from "../common/loader/LoadingThreeDoots";
import SkeletonComment from "../common/skeleton/SkeletonComment";
import AvatarUserComponent from "../profile/AvatarUserComponent";
import { ScrollArea } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";

export default function CommentUserComponent({ username, image_id }) {
  const { ref, inView } = useInView();

  const {
    isLoading,
    isError,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["comment", image_id],
    queryFn: async ({ pageParam = "" }) => {
      const res = await getCommentByImage(image_id, {
        limit: 3,
        cursor: pageParam,
      });
      return res.data;
    },
    getNextPageParam: ({ data }) => {
      const comments = data.comments;
      return comments ? comments[comments.length - 1].id : undefined;
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (inView || hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  const dataComments = () => {
    if (data && data.pages) {
      return data.pages.reduce((prev, { data }) => {
        const comments = data.comments;
        if (comments) prev.push(...comments);
        return prev;
      }, []);
    }
  };

  const allComments = dataComments();
  const variables = useMutationState<string>({
    filters: { mutationKey: ["addComment"], status: "pending" },
    select: (mutation) => mutation.state.variables,
  });

  if (isLoading)
    return (
      <div className="container py-6">
        <SkeletonComment />
      </div>
    );

  if (isError) return <ErrorMessage errMessage={error.message} />;

  return (
    <ScrollArea className="my-3 h-[50vh]">
      {variables[0] && (
        <div className="flex items-start gap-2 p-4 w-full opacity-50">
          <Skeleton className="w-6 h-6 rounded-full" />
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
      {allComments.length !== 0 ? (
        <>
          {allComments.map((comment) => (
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
          ))}
          <div ref={ref} className="my-6">
            {isFetchingNextPage ? (
              <div className="w-full rounded-full grid place-items-center p-3 text-xs border border-border">
                <LoadingThreeDoots />
              </div>
            ) : hasNextPage ? (
              <p className="text-xs text-muted-foreground text-center">
                Load Newer
              </p>
            ) : (
              <p className="text-xs text-muted-foreground text-center">
                Nothing more to load
              </p>
            )}
          </div>
        </>
      ) : (
        <p className="text-sm text-muted-foreground text-center">
          No comments yet
        </p>
      )}
    </ScrollArea>
  );
}
