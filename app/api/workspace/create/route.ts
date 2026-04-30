import { type NextRequest, NextResponse } from "next/server";
import CreateWorkspace from "@/features/workspace/api/create-workspace";

export async function POST(req: NextRequest) {
  try {
    const response = await CreateWorkspace(req);

    if (!response) {
      console.log("Error creating workspace:❌ create-workspace.ts");
    }

    return response;
  } catch (error) {
    console.log("Error creating workspace:❌", error);

    return NextResponse.json(
      { error: "Error creating workspace" },
      { status: 500 },
    );
  }
}
