import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export default async function useUserLogged() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }

  return true;
}
