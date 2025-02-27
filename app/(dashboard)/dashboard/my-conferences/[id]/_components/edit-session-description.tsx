"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { editSessionDescription } from "@/utils/db/actions/sessions";
import { Session } from "@/utils/db/schema";
import { CircleDashed, Pencil } from "lucide-react";
import React, { useActionState } from "react";

const EditSessionDescription = ({ session }: { session: Session }) => {
  const [state, formAction, isPending] = useActionState(
    editSessionDescription,
    null
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs mt-3" size="sm">
          <Pencil className="" size={4} />
          Edit Description
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogTitle>Edit Session Description</DialogTitle>
        <form action={formAction} className="flex flex-col gap-3">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            className="w-full"
            defaultValue={session.description}
            maxLength={255}
          />
          <Input
            type="hidden"
            id="session_id"
            name="session_id"
            value={session.id}
          />

          {state?.error && (
            <p className="text-red-500 text-sm">{state.error.toString()}</p>
          )}

          <Button type="submit" className="w-full relative">
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

export default EditSessionDescription;
