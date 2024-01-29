import { useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../services/authApi";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user) => registerUser(user),
  });
};
