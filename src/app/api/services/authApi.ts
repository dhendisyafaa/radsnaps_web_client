import axios from "@/lib/axios";

const registerUser = (data) => {
  return axios.post(`/register`, data);
};

const loginUser = (data) => {
  return axios.post(`/login`, data);
};

const loginWithGoogle = (data) => {
  return axios.post(`/login-google`, data);
};

const refreshToken = () => {
  return axios.post(`/refresh`, {
    refresh,
  });
};

export { registerUser, loginUser, loginWithGoogle };
