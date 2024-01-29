import axios from "@/lib/axios";

export const getUserById = (auth, id) => {
  return auth.get(`/user/${id}`);
};

export const getUserByUsername = (auth, username) => {
  return auth.get(`/user/${username}`);
};
