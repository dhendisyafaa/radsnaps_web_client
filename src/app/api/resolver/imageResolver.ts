import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  getAllImage,
  getDetailImage,
  getTrendingImage,
} from "../services/imageApi";

const useAllImage = (params) => {
  return useQueryNoRefecth(
    ["images", params],
    async () => await getAllImage(params)
  );
};

const useDetailImage = (id) => {
  return useQueryNoRefecth(["image", id], async () => await getDetailImage(id));
};

const useTrendingImage = () => {
  return useQueryNoRefecth(["trending"], async () => await getTrendingImage());
};

export { useAllImage, useDetailImage, useTrendingImage };
