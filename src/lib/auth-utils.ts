import { getSession as getClientSession } from "next-auth/react";
import { auth } from "@/auth";

export async function getSessionToken() {
  // check if functions are on the server or client
  const isServer = typeof window === "undefined";

  try {
    if (isServer) {
      const session = await auth();
      return (session as any)?.accessToken || null;
    } else {
      const session = await getClientSession();
      return (session as any)?.accessToken || null;
    }
  } catch (error) {
    console.error("Error retrieving auth session:", error);
    return null;
  }
}
