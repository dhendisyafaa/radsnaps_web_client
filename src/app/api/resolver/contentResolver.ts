import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import { getContentBySearch, getContentReported } from "../services/contentApi";

export const useContentBySearch = (data) => {
  return useQueryNoRefecth(
    [`search ${data.endpoint}`, `${data.query.q}`],
    async () => await getContentBySearch(data.endpoint, data.query)
  );
};

export const useContentReported = (data) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    [`report ${data.endpoint}`, data.id],
    async () => await getContentReported(axiosAuth, data.endpoint, data.id)
  );
};
