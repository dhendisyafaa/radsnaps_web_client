"use client";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";

export const useDecodedToken = () => {
  const { data: session } = useSession();

  const decoded = jwtDecode(session?.user.accessToken);
  return {
    fullname: decoded.fullname,
    username: decoded.username,
    user_id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };
};
