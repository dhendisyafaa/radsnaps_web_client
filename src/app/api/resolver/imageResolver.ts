import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  addImageToAlbum,
  deleteImageInAlbum,
  getAllImage,
  getDetailImage,
  getImageByAlbum,
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

const useDetailImage = (id) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["image", id],
    async () => await getDetailImage(axiosAuth, id)
  );
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
  const params = useSearchParams();
  const query = params.get("q");
  const decodeURI = query?.replace(/-/g, " ");
  const filter = params.get("filter") || null;

  return useMutation({
    mutationFn: (data) => {
      const payload = {
        album_id: data.album_id,
        image_id: data.image_id,
        updated_at: data.updated_at,
      };
      return addImageToAlbum(axiosAuth, payload);
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["albums", `${variables.user_id}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["image-album", `${variables.album_id}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["image", `${variables.image_id}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["images", `${filter}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["search image", `${decodeURI}`],
      });
    },
  });
};

const useDeleteImageInAlbum = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  const params = useSearchParams();
  const query = params.get("q");
  const decodeURI = query?.replace(/-/g, " ");
  const filter = params.get("filter") || null;

  return useMutation({
    mutationFn: (data) => {
      const payload = {
        album_id: data.album_id,
        image_id: data.image_id,
        updated_at: data.updated_at,
      };
      return deleteImageInAlbum(axiosAuth, payload);
    },
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["albums", `${variables.user_id}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["image-album", `${variables.album_id}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["image", `${variables.image_id}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["images", `${filter}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["search image", `${decodeURI}`],
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
  useImagesByUser,
  usePostImage,
  useTrendingImage,
};
