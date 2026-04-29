"use client";

import SignOutButton from "@/components/sign-out-button";
import WorkspaceModal from "./workspace-modal";

const WorkspaceButton = () => {
  return (
    <>
      <WorkspaceModal />
      <SignOutButton />
    </>
  );
};

export default WorkspaceButton;
