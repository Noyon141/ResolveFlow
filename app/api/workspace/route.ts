import type { NextRequest } from "next/server";
import { createWorkspace } from "@/features/workspace/api/create-workspace";

export async function POST(req: NextRequest) {
  await createWorkspace(req);
}
