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
import {
  updateConferenceDates,
  updateConferenceLocation,
  updateConferenceAttendees,
} from "@/utils/db/actions/conference";
import { CircleDashed, Pencil } from "lucide-react";
import React, { useTransition } from "react";

const UpdateConferenceAttendees = ({
  id,
  attendees,
}: {
  id: number;
  attendees: number | undefined;
}) => {
  const [isPending, startTransition] = useTransition();

  const clientAction = async (formData: FormData) => {
    const attendees = formData.get("attendees") as string;

    startTransition(() => {
      updateConferenceAttendees(id, Number(attendees));
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-xs">
          <Pencil className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl font-bold">
          Update Conference Location
        </DialogTitle>
        <form action={clientAction} className="flex flex-col items-end gap-3">
          <div className="flex-1  w-full">
            <Label htmlFor="attendees">Max Attendees</Label>
            <div className="flex flex-row gap-3 items-center">
              <Input
                type="number"
                className="w-full"
                id="attendees"
                name="attendees"
                defaultValue={attendees}
              />
     
            </div>
            <Input type="hidden" name="id" value={id} />
          </div>
          <Button type="submit" className="relative w-1/3" disabled={isPending}>
            Update
            {isPending && (
              <div className="absolute inset-0 rounded-full flex items-center justify-center ">
                <CircleDashed className="animate-spin" />
              </div>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateConferenceAttendees;
