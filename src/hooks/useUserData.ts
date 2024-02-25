import { useSession } from "next-auth/react";

export const useUserData = () => {
  const { data: session, status } = useSession();
  return {
    status,
    user_id: session?.user.parsed.id,
    username: session?.user.parsed.username,
    email: session?.user.parsed.email,
    role: session?.user.parsed.role,
  };
};
