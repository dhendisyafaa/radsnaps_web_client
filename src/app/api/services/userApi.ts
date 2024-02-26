import axios from "@/lib/axios";

export const getUserById = (auth, id) => {
  return auth.get(`/user/${id}`);
};

export const getUserByUsername = (auth, username) => {
  return auth.get(`/user/username/${username}`);
};

export const getAvatarUser = (auth, id) => {
  return auth.get(`/user/avatar/${id}`);
};

export const updateProfileUser = (auth, id, data) => {
  return auth.patch(`/user/${id}`, data);
};

export const updateAvatarUser = (auth, id, data) => {
  return axios.patch(`/user/avatar/${id}`, data);
};
