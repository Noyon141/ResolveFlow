import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await authClient.getSession();

  if (session) {
    redirect("/dashboard");
  }
  return <main className="w-full min-h-full flex flex-col">{children}</main>;
};

export default AuthLayout;
