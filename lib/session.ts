import { getServerSession as getSession } from "next-auth/next";
import { authOptions } from "./auth";

export async function getServerSession() {
  return await getSession(authOptions);
}
