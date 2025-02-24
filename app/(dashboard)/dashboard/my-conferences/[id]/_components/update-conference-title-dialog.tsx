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
import { updateConferenceTitle } from "@/utils/db/actions/conference";
import { CircleDashed, Pencil } from "lucide-react";
import React, { useTransition } from "react";

const UpdateConferenceTitle = ({
  id,
  title,
}: {
  id: number;
  title: string | undefined;
}) => {
  const [isPending, startTransition] = useTransition();

  
  const clientAction = async (formData:FormData) => {

    const title = formData.get('title') as string;

    startTransition(() => {
      updateConferenceTitle(id, title);
    });
  }


  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="ml-3" size="icon">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-xl font-bold">
          Update Conference Title
        </DialogTitle>
        <form action={clientAction}  className="flex items-end gap-3">
          <div className="flex-1 w-full">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              className="w-full"
              id="title"
              name="title"
              defaultValue={title}
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

export default UpdateConferenceTitle;
