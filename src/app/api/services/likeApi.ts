export const getLikeByImage = (auth, id) => {
  return auth.get(`/like/${id}`);
};

export const createLikeImage = (auth, data) => {
  return auth.post(`/like`, data);
};

export const dislikeImage = (auth, id) => {
  return auth.delete(`/like/${id}`);
};
