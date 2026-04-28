// import { and, eq } from "drizzle-orm";
// import { type NextRequest, NextResponse } from "next/server";
// import { db } from "@/db";
// import { workspace } from "@/db/schema";
// import { checkServerSession } from "@/lib/check-server-session";

// export const getWorkspace = async (
//   req: NextRequest,
//   params: Promise<{ id: string }>,
// ) => {
//   try {
//     const session = await checkServerSession();
//     if (!session?.session || session.user.role !== "admin") {
//       console.log("Unauthorized ❌");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const workspaceId = (await params).id;

//     const existingWorkspace = await db.query.workspace.findFirst({
//       where: and(
//         eq(workspace.id, workspaceId),
//         eq(workspace.userId, session.user.id),
//       ),
//       with: {
//         workspaceMember: true,
//       },
//       columns: {
//         name: true,
//         description: true,
//         inboundPrefix: true,
//       },
//     });

//     if (!existingWorkspace) {
//       return NextResponse.json(
//         { error: "Workspace not found" },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json(
//       { success: true, data: existingWorkspace },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.log("Error fetching workspace:", error);
//     return NextResponse.json(
//       { error: "Error fetching workspace ❌" },
//       { status: 500 },
//     );
//   }
// };
