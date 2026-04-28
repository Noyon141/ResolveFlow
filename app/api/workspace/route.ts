import type { NextRequest } from "next/server";
import { createWorkspace } from "@/features/workspace/api/get-workspace";

export async function POST(req: NextRequest) {
  await createWorkspace(req);
}
