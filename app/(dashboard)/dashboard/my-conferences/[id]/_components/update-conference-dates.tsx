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
} from "@/utils/db/actions/conference";
import { CircleDashed, Pencil } from "lucide-react";
import React, { useTransition } from "react";

const UpdateConferenceDates = ({
  id,
  start_date,
  end_date,
}: {
  id: number;
  start_date: string | undefined;
  end_date: string | undefined;
}) => {
  const [isPending, startTransition] = useTransition();

  const clientAction = async (formData: FormData) => {
    const start_date = formData.get("start_date") as string;
    const end_date = formData.get("end_date") as string;

    startTransition(() => {
      updateConferenceDates(id, start_date, end_date);
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
          Update Conference Description
        </DialogTitle>
        <form action={clientAction} className="flex flex-col items-end gap-3">
          <div className="flex-1  w-full">
            <Label htmlFor="description">Dates</Label>
            <div className="flex flex-row gap-3 items-center">
                <Input
                    type="date"
                    className="w-full"
                    id="start_date"
                    name="start_date"
                    defaultValue={start_date}
                />
                <Input
                    type="date"
                    className="w-full"
                    id="end_date"
                    name="end_date"
                    defaultValue={end_date}
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

export default UpdateConferenceDates;
