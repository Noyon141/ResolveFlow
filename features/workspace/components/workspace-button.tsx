import { PlusCircle } from "lucide-react";
import SignOutButton from "@/components/sign-out-button";
import { Button } from "@/components/ui/button";

const WorkspaceButton = () => {
  return (
    <>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create Workspace
      </Button>
      <SignOutButton />
    </>
  );
};

export default WorkspaceButton;
