import { create } from "zustand";

interface WorkspaceState {
  remaining: boolean;
  isCreated: (remaining: boolean) => void;
}
export const workspaceStore = create<WorkspaceState>(() => ({
  remaining: false,
  isCreated: (remaining) => {
    remaining;
  },
}));
