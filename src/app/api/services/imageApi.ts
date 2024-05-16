import axios from "@/lib/axios";
import { convertToURI } from "@/utils/convertObjectToURI";

export const getAllImage = (auth, params) => {
  const objString = convertToURI(params);
  return auth.get(`/image/${objString}`);
};

export const getDetailImage = (auth, id) => {
  return auth.get(`/image/${id}`);
};

export const getImageByAlbum = (auth, id, params) => {
  const objString = convertToURI(params);
  return auth.get(`/image/album/${id}${objString}`);
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
