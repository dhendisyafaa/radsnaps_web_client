import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  createLikeImage,
  dislikeImage,
  getLikeByImage,
  getLikeByUser,
} from "../services/likeApi";
import { usePathname, useSearchParams } from "next/navigation";

export const useLikeByImage = (data) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(["like", data.image_id], async () =>
    getLikeByImage(axiosAuth, data.image_id)
  );
};

export const useLikeByUser = (params) => {
  return useQueryNoRefecth(
    ["like", params.user_id],
    async () => await getLikeByUser(params)
  );
};

export const useCreateLikeByImage = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const query = params.get("q");
  const decodeURI = query?.replace(/-/g, " ");
  const pathname = usePathname();
  const albumId = pathname.split("/")[2];

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
      await queryClient.invalidateQueries({
        queryKey: ["search image", `${decodeURI}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["image-album", `${albumId}`],
      });
    },
  });
};

export const useDislikeImage = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const query = params.get("q");
  const decodeURI = query?.replace(/-/g, " ");
  const pathname = usePathname();
  const albumId = pathname.split("/")[2];

  return useMutation({
    mutationFn: (data) => dislikeImage(axiosAuth, data.image_id),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["image", `${variables.image_id}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["image-album", `${variables.image_id}`],
      });
      await queryClient.invalidateQueries({ queryKey: ["images"] });
      await queryClient.invalidateQueries({
        queryKey: ["search image", `${decodeURI}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["image-album", `${albumId}`],
      });
    },
  });
};
