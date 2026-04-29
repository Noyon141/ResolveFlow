"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "../hooks/useCreateWorkspace";

const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, "Workspace name is required")
    .max(100, "Name is too long"),
  description: z.string().max(255, "Description is too long").optional(),
});

type CreateWorkspaceInput = z.infer<typeof createWorkspaceSchema>;

const WorkspaceModal = () => {
  const [open, setOpen] = useState(false);

  const { mutate: createWorkspace, isPending } = useCreateWorkspace();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateWorkspaceInput>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: CreateWorkspaceInput) => {
    createWorkspace(
      {
        name: data.name,
        description: data.description,
        role: "ADMIN", // Creator is usually an ADMIN
      },
      {
        onSuccess: () => {
          setOpen(false);
          reset();
        },
      },
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button disabled={isPending}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Workspace
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Workspace</DialogTitle>
            <DialogDescription>
              Create a new workspace to organize tickets and invite team
              members.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
            <Field>
              <FieldLabel htmlFor="workspace-name">Workspace Name *</FieldLabel>
              <Input
                id="workspace-name"
                placeholder="e.g. Acme Support Team"
                disabled={isPending}
                {...register("name")}
                aria-invalid={!!errors.name}
              />
              {errors.name && <FieldError>{errors.name.message}</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="workspace-desc">
                Description (Optional)
              </FieldLabel>
              <Input
                id="workspace-desc"
                placeholder="Brief description of this workspace"
                disabled={isPending}
                {...register("description")}
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <FieldError>{errors.description.message}</FieldError>
              )}
            </Field>

            <div className="flex justify-end pt-4 space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Workspace"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkspaceModal;
