import axios from "@/lib/axios";
import { convertToURI } from "@/utils/convertObjectToURI";

export const getTotalUsers = (auth) => {
  return auth.get(`/users-length`);
};

export const getTotalImages = (auth) => {
  return auth.get(`/images-length`);
};

export const getTotalAlbums = (auth) => {
  return auth.get(`/albums-length`);
};

export const getDataUserAnalythics = (auth) => {
  return auth.get(`/user-statistics`);
};
