"use client";

import { useQuery } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

export const checkSessionClient = () => {
  useQuery({
    queryKey: ["client-session"],
    queryFn: async () => {
      const session = await authClient.getSession();
      return session.data;
    },
  });
};
