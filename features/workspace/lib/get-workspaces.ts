"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { workspace, workspaceMember } from "@/db/schema";
import { checkServerSession } from "@/lib/check-server-session";

/**
 * Server Action to fetch the current user's workspaces.
 * Because of the "use server" directive, this can be called directly
 * inside both Server Components and Client Components.
 */
export async function getUserWorkspaces() {
  const session = await checkServerSession();

  if (!session?.session) {
    return [];
  }

  const existingWorkspaces = await db
    .select({
      id: workspace.id,
      name: workspace.name,
      description: workspace.description,
      inboundPrefix: workspace.inboundPrefix,
      role: workspaceMember.role,
    })
    .from(workspace)
    .innerJoin(workspaceMember, eq(workspace.id, workspaceMember.workspaceId))
    .where(eq(workspace.userId, session.user.id));

  return existingWorkspaces;
}
