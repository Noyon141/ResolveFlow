import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type Role = "ADMIN" | "MANAGER" | "AGENT";

interface CreateWorkspaceProps {
  name: string;
  description?: string;
  role: Role;
}
export const useCreateWorkspace = () => {
  return useMutation({
    mutationFn: async (data: CreateWorkspaceProps) => {
      const res = await axios.post("/api/workspace/create", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Workspace created successfully.");
      console.log("Workspace created successfully.");
    },
    onError: (error) => {
      console.error("Error creating workspace:", error);
    },
  });
};
