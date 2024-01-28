import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createLikeImage,
  dislikeImage,
  getLikeByImage,
} from "../services/likeApi";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

export const useLikeByImage = (data) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["like", data.image_id],
    getLikeByImage(axiosAuth, data.image_id)
  );
};

export const useCreateLikeByImage = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createLikeImage(axiosAuth, data.like),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
};

export const useDislikeImage = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => dislikeImage(axiosAuth, data.id),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
};
