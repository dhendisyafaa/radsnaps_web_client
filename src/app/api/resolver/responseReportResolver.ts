import useAxiosAuth from "@/hooks/useAxiosAuth";
import { generateResponseReport } from "../services/responseReportApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryNoRefecth from "../hooks/useQueryNoRefetch";
import { getReportById } from "../services/reportIssueApi";

export const useReportById = (id) => {
  const axiosAuth = useAxiosAuth();
  return useQueryNoRefecth(
    ["report", id],
    async () => await getReportById(axiosAuth, id)
  );
};

export const useCreateResponseReport = () => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => generateResponseReport(axiosAuth, data),
    onSuccess: async (data, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: ["reports"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["images"],
      });
    },
  });
};
