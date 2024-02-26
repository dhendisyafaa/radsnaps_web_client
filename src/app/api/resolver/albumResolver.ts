import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  createAlbum,
  deleteAlbum,
  getAlbumsByUser,
  getAllAlbum,
  getAllOfficialAlbum,
  getDetailAlbum,
  updateDetailAlbum,
} from "../services/albumApi";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export const useAllAlbum = () => {
  return useQueryNoRefecth(["albums"], async () => await getAllAlbum());
};

export const useAllOfficialAlbum = () => {
  return useQueryNoRefecth(
    ["official-albums"],
    async () => await getAllOfficialAlbum()
  );
};

export const useDetailAlbum = (id) => {
  return useQueryNoRefecth(["album", id], async () => await getDetailAlbum(id));
};

export const useAlbumsByUser = (params) => {
  return useQueryNoRefecth(
    ["albums", params.user_id],
    async () => await getAlbumsByUser(params)
  );
};

export const useCreateAlbum = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createAlbum(axiosAuth, data),
    onSettled: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
    },
  });
};

export const useUpdateAlbum = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateDetailAlbum(axiosAuth, data.id, data.body),
    onSettled: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["album", `${context.id}`],
      });
      await queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
    },
  });
};

export const useDeleteAlbum = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteAlbum(axiosAuth, id),
    onSettled: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["albums"],
      });
    },
  });
};
