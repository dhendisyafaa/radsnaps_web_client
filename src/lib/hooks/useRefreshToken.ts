"use client";
import { signIn, useSession } from "next-auth/react";
import axios from "../axios";

export default function useRefreshToken() {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios.get("/refresh", {
      headers: {
        Authorization: `Bearer ${session?.user.refreshToken}`,
      },
    });

    if (session) session.user.accessToken = res.data.accessToken;
    else signIn();
  };
  return refreshToken;
}
