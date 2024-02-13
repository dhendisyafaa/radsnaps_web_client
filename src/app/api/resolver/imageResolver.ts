import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  addImageToAlbum,
  deleteImageInAlbum,
  getAllImage,
  getDetailImage,
  getImageByAlbum,
  getImagesBySearch,
  getImagesByUser,
  getTrendingImage,
  postImage,
} from "../services/imageApi";

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

const useImageByAlbum = (id) => {
  return useQueryNoRefecth(
    ["image-album", id],
    async () => await getImageByAlbum(id)
  );
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
    onSettled: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
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
        queryKey: ["album", `${context.album_id}`],
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
        queryKey: ["album", `${context.album_id}`],
      });
    },
  });
};

export {
  useAllImage,
  useDeleteImageInAlbum,
  useDetailImage,
  useImageByAlbum,
  useImageToAlbum,
  useImagesBySearch,
  useImagesByUser,
  usePostImage,
  useTrendingImage,
};
