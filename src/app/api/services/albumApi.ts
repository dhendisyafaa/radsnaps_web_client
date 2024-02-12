import axios from "@/lib/axios";
import { convertToURI } from "@/utils/convertObjectToURI";

export const getAllAlbum = () => {
  return axios.get(`/album`);
};

export const getAllOfficialAlbum = () => {
  return axios.get(`/official-album`);
};

export const getDetailAlbum = (id) => {
  return axios.get(`/album/${id}`);
};

export const getAlbumsByUser = (params) => {
  const objString = convertToURI(params);
  return axios.get(`/album/user/${objString}`);
};

export const createAlbum = (auth, data) => {
  return auth.post("/album", data, {
    headers: { "content-type": "multipart/form-data" },
  });
};
