import axios from "@/lib/axios";

export const getUserById = (auth, id) => {
  return auth.get(`/user/${id}`);
};
