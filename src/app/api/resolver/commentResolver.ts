import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  createCommentByImage,
  getCommentByImage,
} from "../services/commentApi";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

export const useCommentByImage = (image_id) => {
  return useQueryNoRefecth(
    ["comment", image_id],
    async () => await getCommentByImage(image_id)
  );
};

export const useCreateComment = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createCommentByImage(axiosAuth, data.comment),
    onSettled: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["comment", context.comment.image_id],
      });
    },
    mutationKey: ["addComment"],
  });
};
