import { useSession } from "next-auth/react";

export const useUserData = () => {
  const { data: session, status } = useSession();
  return {
    status,
    user_id: session?.user.id,
    username: session?.user.username,
    email: session?.user.email,
    avatar: session?.user.avatar,
  };
};
