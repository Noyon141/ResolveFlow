import { eq } from "drizzle-orm";
import { ArrowRight, Building2, Key } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db";
import { workspace, workspaceMember } from "@/db/schema";
import { checkServerSession } from "@/lib/check-server-session";
import WorkspaceButton from "./workspace-button";

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
      <main className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-4 py-8">
        <div className="flex flex-col items-center justify-center text-center max-w-md w-full gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Building2 className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            No Workspaces Found
          </h2>
          <p className="text-muted-foreground">
            You don't belong to any workspaces yet. Create a new one or wait for
            an invitation.
          </p>
          <div className="mt-4 flex gap-4">
            <WorkspaceButton />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Workspaces
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Select a workspace to manage tickets and operations.
            </p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <WorkspaceButton />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {existingWorkspace.map((ws) => (
            <Link
              key={ws.id}
              href={`/workspace/${ws.id}`}
              className="block group"
            >
              <Card className="h-full flex flex-col transition-colors border-border hover:border-primary/50 hover:bg-muted/20">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-semibold truncate pr-4 group-hover:text-primary transition-colors">
                      {ws.name}
                    </CardTitle>
                    <Badge variant="secondary" className="font-medium shrink-0">
                      {ws.role}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2 h-10">
                    {ws.description || "No description provided."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-2 pb-0">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono bg-muted/50 rounded-md px-2 py-1 w-fit">
                    <Key className="h-3 w-3" />
                    <span>{ws.inboundPrefix}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-4 pb-4 mt-2 border-t flex justify-end text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  <span className="flex items-center gap-1 font-medium">
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Workspace;
