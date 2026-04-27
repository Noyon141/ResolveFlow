import type React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-full min-h-full flex flex-col">{children}</main>;
};

export default DashboardLayout;
