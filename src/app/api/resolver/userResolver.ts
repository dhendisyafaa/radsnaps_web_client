import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import { getUserById, getUserByUsername } from "../services/userApi";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

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
