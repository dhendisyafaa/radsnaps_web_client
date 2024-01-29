import axios from "@/lib/axios";
import { convertToURI } from "@/utils/convertObjectToURI";

export const getAllImage = (params) => {
  const objString = convertToURI(params);
  return axios.get(`/image/${objString}`);
};

export const getImagesBySearch = (params) => {
  const objString = convertToURI(params);
  return axios.get(`/image/search${objString}`);
};

export const getDetailImage = (id) => {
  return axios.get(`/image/${id}`);
};

export const getImagesByUser = (params) => {
  const objString = convertToURI(params);
  return axios.get(`/image/user/${objString}`);
};

export const getTrendingImage = () => {
  return axios.get(`/image/trending`);
};
