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

export const getImageByAlbum = (id) => {
  return axios.get(`/image/album/${id}`);
};

export const getImagesByUser = (params) => {
  const objString = convertToURI(params);
  return axios.get(`/image/user/${objString}`);
};

export const getTrendingImage = () => {
  return axios.get(`/image/trending`);
};

export const postImage = (auth, data) => {
  return auth.post("/image", data, {
    headers: { "content-type": "multipart/form-data" },
  });
};

export const addImageToAlbum = (auth, data) => {
  return auth.post("/image-album", data);
};

export const deleteImageInAlbum = (auth, params) => {
  const objString = convertToURI(params);
  return auth.delete(`/image-album/${objString}`);
};
