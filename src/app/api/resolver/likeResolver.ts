import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createLikeImage,
  dislikeImage,
  getLikeByImage,
  getLikeByUser,
} from "../services/likeApi";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

export const useLikeByImage = (data) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(["like", data.image_id], async () =>
    getLikeByImage(axiosAuth, data.image_id)
  );
};

export const useLikeByUser = (params) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["like", params.user_id],
    async () => await getLikeByUser(axiosAuth, params)
  );
};

export const useCreateLikeByImage = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createLikeImage(axiosAuth, data.like),
    onSettled: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ["images"] }),
        await queryClient.invalidateQueries({
          queryKey: ["image", context?.like.image_id],
        });
    },
  });
};

export const useDislikeImage = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => dislikeImage(axiosAuth, data.id),
    onSettled: async (data, variables, context) => {
      await queryClient.invalidateQueries({ queryKey: ["images"] }),
        await queryClient.invalidateQueries({
          queryKey: ["image", context?.like.image_id],
        });
    },
  });
};
