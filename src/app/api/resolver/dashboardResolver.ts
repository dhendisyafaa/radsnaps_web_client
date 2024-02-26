import useAxiosAuth from "@/hooks/useAxiosAuth";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  getDataUserAnalythics,
  getTotalAlbums,
  getTotalImages,
  getTotalUsers,
} from "../services/dashboardApi";

export const useTotalUsers = () => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["users-length"],
    async () => await getTotalUsers(axiosAuth)
  );
};

export const useTotalImages = () => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["images-length"],
    async () => await getTotalImages(axiosAuth)
  );
};

export const useTotalAlbums = () => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["albums-length"],
    async () => await getTotalAlbums(axiosAuth)
  );
};

export const useUserAnalythics = () => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["user-statistics"],
    async () => await getDataUserAnalythics(axiosAuth)
  );
};
