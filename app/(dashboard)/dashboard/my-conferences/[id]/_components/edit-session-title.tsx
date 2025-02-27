"use client";

import React, { useActionState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CircleDashed, Pencil } from "lucide-react";
import { Session } from "@/utils/db/schema";
import { editSessionTitle } from "@/utils/db/actions/sessions";

const EditSessionTitle = ({ session }: { session: Session }) => {
  const [state, formAction, isPending] = useActionState(editSessionTitle, null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogTitle>Edit Session Title</DialogTitle>
        <form action={formAction} className="flex flex-col gap-3">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              defaultValue={session.title}
            />
            <Input
              type="hidden"
              id="session_id"
              name="session_id"
              value={session.id}
            />
          </div>

          <Button type="submit" className="w-1/3 relative">
            Save
            {isPending && (
              <div className="absolute inset-0 flex bg-slate-300/30 items-center justify-center">
                <CircleDashed className="animate-spin" />
              </div>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditSessionTitle;
