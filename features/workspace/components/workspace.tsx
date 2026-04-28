"use client";

import { workspaceStore } from "../store/workspace-store";

const Workspace = () => {
  const { remaining, isCreated } = workspaceStore();

  if (remaining) {
    return <div>Workspace</div>;
  }
  return (
    <>
      <div className=""></div>
    </>
  );
};

export default Workspace;
