import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  addImageToAlbum,
  deleteImageInAlbum,
  getAllImage,
  getDetailImage,
  getImagesBySearch,
  getImagesByUser,
  getTrendingImage,
  postImage,
} from "../services/imageApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAllImage = (params) => {
  return useQueryNoRefecth(
    ["images", `${params.filter}`],
    async () => await getAllImage(params)
  );
};

const useImagesBySearch = (params) => {
  return useQueryNoRefecth(
    ["images", `search: ${params.q}`],
    async () => await getImagesBySearch(params)
  );
};

const useDetailImage = (id) => {
  return useQueryNoRefecth(["image", id], async () => await getDetailImage(id));
};

const useImagesByUser = (params) => {
  return useQueryNoRefecth(
    ["image", params.user_id],
    async () => await getImagesByUser(params)
  );
};

const useTrendingImage = () => {
  return useQueryNoRefecth(["trending"], async () => await getTrendingImage());
};

const usePostImage = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => postImage(axiosAuth, data),
    // onSettled: (data, variables, context) => {
    // queryClient.invalidateQueries({
    //   queryKey: ["comment", context.comment.image_id],
    // });
    // },
    // mutationKey: ["addComment"],
  });
};

const useImageToAlbum = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => addImageToAlbum(axiosAuth, data),
    onSettled: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["album", context.album_id],
      });
    },
  });
};

const useDeleteImageInAlbum = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => deleteImageInAlbum(axiosAuth, data),
    onSettled: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["album", context.album_id],
      });
    },
  });
};

export {
  useAllImage,
  useDetailImage,
  useTrendingImage,
  useImagesBySearch,
  useImagesByUser,
  usePostImage,
  useImageToAlbum,
  useDeleteImageInAlbum,
};
