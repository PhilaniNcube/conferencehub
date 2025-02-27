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
import { editSessionTime } from "@/utils/db/actions/sessions";
import { Session } from "@/utils/db/schema";
import { CircleDashed, Pencil } from "lucide-react";
import React, { useActionState } from "react";

const EditSessionTime = ({ session }: { session: Session }) => {
  const [state, formAction, isPending] = useActionState(editSessionTime, null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="" size={6} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogTitle>Edit Session Time</DialogTitle>
        <form action={formAction} className="flex items-end gap-3">
          <div>
            <Label htmlFor="start_time">Start Time</Label>
            <Input
              type="time"
              id="start_time"
              name="start_time"
              defaultValue={session.start_time}
            />
            <Input
              type="hidden"
              id="session_id"
              name="session_id"
              value={session.id}
            />
          </div>
          <div>
            <Label htmlFor="end_time">End Time</Label>
            <Input
              type="time"
              id="end_time"
              name="end_time"
              defaultValue={session.end_time}
            />
          </div>

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

export default EditSessionTime;
