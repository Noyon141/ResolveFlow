import type React from "react";

const WorkspaceLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="w-full min-h-full flex flex-col">{children}</main>;
};

export default WorkspaceLayout;
