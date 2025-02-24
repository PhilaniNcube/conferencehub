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
import { updateConferenceDescription, updateConferenceTitle } from "@/utils/db/actions/conference";
import { CircleDashed, Pencil } from "lucide-react";
import React, { useTransition } from "react";

const UpdateConferenceDescription = ({
  id,
  description,
}: {
  id: number;
  description: string | undefined;
}) => {
  const [isPending, startTransition] = useTransition();

  
  const clientAction = async (formData:FormData) => {

    const description = formData.get('description') as string;

    startTransition(() => {
      updateConferenceDescription(id, description);
    });
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-xs">
          Edit description <Pencil className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl font-bold">
          Update Conference Description
        </DialogTitle>
        <form action={clientAction}  className="flex flex-col items-end gap-3">
          <div className="flex-1  w-full">
            <Label htmlFor="description">Description</Label>
            <Textarea
              rows={3}
              className="w-full"
              id="description"
              name="description"
              defaultValue={description}
            />
            <Input type="hidden" name="id" value={id} />
          </div>
          <Button type="submit" className="relative w-1/3" disabled={isPending} >
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

export default UpdateConferenceDescription;
