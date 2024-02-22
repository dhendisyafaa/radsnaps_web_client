export const getAllReportIssues = (auth) => {
  return auth.get(`/reports`);
};

export const getReportById = (auth, id) => {
  return auth.get(`/report/${id}`);
};

export const generateReportIssue = (auth, data) => {
  return auth.post(`/report`, data);
};
