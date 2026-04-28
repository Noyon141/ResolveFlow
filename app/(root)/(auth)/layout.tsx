import { redirect } from "next/navigation";

import { checkServerSession } from "@/lib/check-server-session";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await checkServerSession();

  if (session?.session) {
    redirect("/dashboard");
  }
  return <main className="w-full min-h-full flex flex-col">{children}</main>;
};

export default AuthLayout;
