import axios from "@/lib/axios";
import { convertToURI } from "@/utils/convertObjectToURI";

export const getCommentByImage = (image_id, params = {}) => {
  // const objString = convertToURI(params);
  // return axios.get(`/comment/${image_id}${objString}`);
  return axios.get(`/comment/${image_id}`);
};

export const createCommentByImage = (auth, data) => {
  return auth.post(`/comment`, data);
};
