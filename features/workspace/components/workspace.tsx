import { eq } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/db";
import { workspace, workspaceMember } from "@/db/schema";
import { checkServerSession } from "@/lib/check-server-session";

const Workspace = async () => {
  const session = await checkServerSession();

  if (!session?.session) {
    return (
      <>
        <div className="">You are not authenticated</div>
      </>
    );
  }

  const existingWorkspace = await db
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

  if (existingWorkspace.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-50">
        <div className="text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            No Workspaces Found
          </h2>
          <p className="text-zinc-400 mt-2">
            You haven't been invited to any workspaces yet.
          </p>
        </div>
      </main>
    );
  }
  return (
    <>
      <div className="min-h-screen bg-background p-8 md:p-16">
        <div className="max-w-5xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight">
              Your Workspaces
            </h1>
            <p className="text-zinc-400 mt-1">
              Select a workspace to manage tickets and operations.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {existingWorkspace.map((ws) => (
              <Link key={ws.id} href={`/workspace/${ws.id}`}>
                <div className="group relative rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all hover:bg-zinc-900 hover:border-zinc-700">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold truncate pr-4">
                      {ws.name}
                    </h2>
                    <span className="inline-flex items-center rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-300">
                      {ws.role}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
                    {ws.description || "No description provided."}
                  </p>

                  <div className="flex items-center text-xs text-zinc-500 font-mono">
                    Prefix: {ws.inboundPrefix}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Workspace;
