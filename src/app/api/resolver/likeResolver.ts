import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  createLikeImage,
  dislikeImage,
  getLikeByImage,
  getLikeByUser,
} from "../services/likeApi";

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
    mutationFn: (data) => createLikeImage(axiosAuth, data),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["image", `${variables.image_id}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["image-album", `${variables.image_id}`],
      });
      await queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
};

export const useDislikeImage = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => dislikeImage(axiosAuth, data.id),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["image", `${variables.image_id}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["image-album", `${variables.image_id}`],
      });
      await queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
};
