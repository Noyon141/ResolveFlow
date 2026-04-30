import { desc } from "drizzle-orm";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { workspace, workspaceMember } from "@/db/schema";
import { checkServerSession } from "@/lib/check-server-session";

export default async function CreateWorkspace(req: NextRequest) {
  const session = await checkServerSession();

  if (!session?.session) {
    console.log("User is not authenticated");

    return NextResponse.json(
      { error: "User is not authenticated" },
      { status: 401 },
    );
  }

  if (session?.user.role !== "admin") {
    console.log("User is not an admin");

    return NextResponse.json(
      { error: "User is not an admin" },
      { status: 403 },
    );
  }

  const body = await req.json();

  const { name, description } = body;

  if (!name) {
    console.log("Workspace name is required");
    return NextResponse.json(
      { error: "Workspace name is required" },
      { status: 400 },
    );
  }

  const [newWorkspace] = await db
    .insert(workspace)
    .values({
      name: name,
      description: description,
      userId: session.user.id,
    })
    .returning();

  await db
    .insert(workspaceMember)
    .values({
      workspaceId: newWorkspace.id,
      userId: session.user.id,
      role: "ADMIN",
    })
    .returning();

  return NextResponse.json({ workspace: newWorkspace }, { status: 201 });
}
