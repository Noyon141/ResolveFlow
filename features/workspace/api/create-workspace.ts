import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { workspace } from "@/db/schema";
import { auth } from "@/lib/auth";
import { checkServerSession } from "@/lib/check-server-session";

export const createWorkspace = async (req: NextRequest) => {
  try {
    const session = await checkServerSession();
    if (!session) {
      console.log("Unauthorized ❌");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const { name, description } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const newWorkspace = await db
      .insert(workspace)
      .values({
        name: name,
        description: description,
        userId: session.user.id,
      })
      .returning();

    console.log("New workspace created: ✅", newWorkspace[0]);
    return NextResponse.json({ workspace: newWorkspace[0] }, { status: 201 });
  } catch (error) {
    console.log("Error creating workspace:", error);
    return NextResponse.json(
      { error: "Error creating workspace ❌" },
      { status: 500 },
    );
  }
};
