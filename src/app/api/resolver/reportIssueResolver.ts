import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import {
  generateReportIssue,
  getAllReportIssues,
} from "../services/reportIssueApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAllReportIssues = () => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["reports"],
    async () => await getAllReportIssues(axiosAuth)
  );
};

export const useCreateReportIssue = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => generateReportIssue(axiosAuth, data),
    // onSettled: (data, variables, context) => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["comment", context.image_id],
    //   });
    // },
  });
};
