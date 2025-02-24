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
} from "@/utils/db/actions/conference";
import { CircleDashed, Pencil } from "lucide-react";
import React, { useTransition } from "react";

const UpdateConferenceLocation = ({
  id,
  location,
}: {
  id: number;
  location: string | undefined;
}) => {
  const [isPending, startTransition] = useTransition();

  const clientAction = async (formData: FormData) => {
    const location = formData.get("location") as string;

    startTransition(() => {
      updateConferenceLocation(id, location);
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
            <Label htmlFor="location">Location</Label>
            <div className="flex flex-row gap-3 items-center">
              <Input
                type="text"
                className="w-full"
                id="location"
                name="location"
                defaultValue={location}
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

export default UpdateConferenceLocation;
