import axios from "@/lib/axios";
import { convertToURI } from "@/utils/convertObjectToURI";

export const getContentBySearch = (endpoint, params) => {
  const objString = convertToURI(params);
  return axios.get(`/${endpoint}/search${objString}`);
};

export const getContentReported = (auth, endpoint, id) => {
  return auth.get(`/${endpoint}/${id}`);
};
