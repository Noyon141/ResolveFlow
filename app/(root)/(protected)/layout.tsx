import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import { auth } from "@/lib/auth";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/registration");
  }

  return <>{children}</>;
};

export default ProtectedLayout;
