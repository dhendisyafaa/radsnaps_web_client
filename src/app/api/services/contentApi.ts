import axios from "@/lib/axios";
import { convertToURI } from "@/utils/convertObjectToURI";

export const getContentBySearch = (auth, type, params) => {
  const objString = convertToURI(params);
  return auth.get(`/${type}/search${objString}`);
};

export const getContentReported = (auth, endpoint, id) => {
  return auth.get(`/${endpoint}/${id}`);
};

export const deleteContentReported = (auth, endpoint, id) => {
  return auth.delete(`/${endpoint}/${id}`);
};
