import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  getAllImage,
  getDetailImage,
  getImagesBySearch,
  getImagesByUser,
  getTrendingImage,
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

const useImagesByUser = (params) => {
  return useQueryNoRefecth(
    ["image", params.user_id],
    async () => await getImagesByUser(params)
  );
};

const useTrendingImage = () => {
  return useQueryNoRefecth(["trending"], async () => await getTrendingImage());
};

export {
  useAllImage,
  useDetailImage,
  useTrendingImage,
  useImagesBySearch,
  useImagesByUser,
};
