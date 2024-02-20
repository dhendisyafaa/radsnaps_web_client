export const generateResponseReport = (auth, data) => {
  return auth.post(`/response`, data);
};
