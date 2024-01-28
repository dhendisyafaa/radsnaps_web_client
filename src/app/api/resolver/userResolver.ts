import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import { getUserById } from "../services/userApi";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

const useProfileUser = (id) => {
  const axiosAuth = useAxiosAuth();
  useQueryNoRefecth(["user", id], async () => await getUserById(axiosAuth, id));
};

export { useProfileUser };
