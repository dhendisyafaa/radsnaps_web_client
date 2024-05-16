import axios from "@/lib/axios";
import { convertToURI } from "@/utils/convertObjectToURI";

export const getLikeByImage = (auth, id) => {
  return auth.get(`/like/${id}`);
};

export const getLikeByUser = (params) => {
  const objString = convertToURI(params);
  return axios.get(`/like/user/${objString}`);
};

export const createLikeImage = (auth, data) => {
  return auth.post(`/like`, data);
};

export const dislikeImage = (auth, id) => {
  return auth.delete(`/dislike/image/${id}`);
};
