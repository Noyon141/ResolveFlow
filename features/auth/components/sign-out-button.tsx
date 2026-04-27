"use client";

import { LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

const SignOutButton = () => {
  const [loading, setLoading] = useState(false);

  const onSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setLoading(false);
          redirect("/registration");
        },

        onRequest: () => {
          toast.info("Signing out...");
        },

        onError: () => {
          setLoading(false);
          toast.error("Failed to sign out.");
        },
      },
    });
  };

  return (
    <>
      <Button
        className="flex items-center justify-center gap-2 bg-accent shadow-md backdrop:backdrop-blur-2xl dark:shadow-white/10 "
        onClick={onSignOut}
        disabled={loading}
      >
        Sign Out <LogOutIcon />
      </Button>
    </>
  );
};

export default SignOutButton;
