import useAxiosAuth from "@/hooks/useAxiosAuth";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  deleteContentReported,
  getContentBySearch,
  getContentReported,
} from "../services/contentApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useContentBySearch = (data) => {
  return useQueryNoRefecth(
    [`search ${data.type}`, `${data.query.search}`],
    async () => await getContentBySearch(data.type, data.query)
  );
};

export const useContentReported = (data) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    [`report ${data.endpoint}`, data.id],
    async () => await getContentReported(axiosAuth, data.endpoint, data.id)
  );
};

export const useDeleteContentReported = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) =>
      deleteContentReported(axiosAuth, data.endpoint, data.id),
  });
};
