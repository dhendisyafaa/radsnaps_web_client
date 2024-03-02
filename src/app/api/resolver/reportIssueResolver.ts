import useAxiosAuth from "@/hooks/useAxiosAuth";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  generateReportIssue,
  getAllReportIssues,
  getReportById,
} from "../services/reportIssueApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAllReportIssues = () => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["reports"],
    async () => await getAllReportIssues(axiosAuth)
  );
};

export const useReportById = (id) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["report", id],
    async () => await getReportById(axiosAuth, id)
  );
};

export const useCreateReportIssue = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => generateReportIssue(axiosAuth, data),
  });
};
