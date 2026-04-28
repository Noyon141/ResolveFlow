import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";
import { auth } from "@/lib/auth";
import { checkServerSession } from "@/lib/check-server-session";

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await checkServerSession();

  if (!session?.session) {
    redirect("/registration");
  }

  return <>{children}</>;
};

export default ProtectedLayout;
