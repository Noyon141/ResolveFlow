import { create } from "zustand";

export type Workspace = {
  id: string;
  name: string;
  description?: string;
  // Add other workspace fields here based on your db schema
};

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  addWorkspace: (workspace: Workspace) => void;
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspace: (workspace: Workspace | null) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  //INITIAL VALUES 
  workspaces: [],
  activeWorkspace: null,

  //ACTIONS 
  addWorkspace: (workspace) =>
    set((state) => ({
      workspaces: [...state.workspaces, workspace],
      // Optionally set the new one as active immediately:
      activeWorkspace: workspace,
    })),
  setWorkspaces: (workspaces) => set({ workspaces }),
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
}));
