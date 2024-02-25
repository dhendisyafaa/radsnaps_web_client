import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  getAvatarUser,
  getUserById,
  getUserByUsername,
  updateAvatarUser,
  updateProfileUser,
} from "../services/userApi";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export const useUserById = (id) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["user", id],
    async () => await getUserById(axiosAuth, id)
  );
};

export const useUserByUsername = (username) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["user", username],
    async () => await getUserByUsername(axiosAuth, username)
  );
};

export const useAvatarUser = (id) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["avatar", id],
    async () => await getAvatarUser(axiosAuth, id)
  );
};

export const useUpdateProfile = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateProfileUser(axiosAuth, data.id, data.data),
    onSettled: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["user", context.data.username],
      });
    },
  });
};

export const useUpdateAvatarUser = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => updateAvatarUser(axiosAuth, data.id, data.data_image),
  });
};
