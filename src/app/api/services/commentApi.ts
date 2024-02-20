import axios from "@/lib/axios";
import { convertToURI } from "@/utils/convertObjectToURI";

export const getCommentByImage = (image_id, params = {}) => {
  return axios.get(`/comment/image/${image_id}`);
};

export const createCommentByImage = (auth, data) => {
  return auth.post(`/comment`, data);
};
