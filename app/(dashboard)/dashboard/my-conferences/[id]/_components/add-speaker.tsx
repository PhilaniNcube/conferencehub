"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CircleDashed, CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { speakerCreateSchema } from "@/utils/db/schema";
import { useActionState } from "react";
import { createSpeaker } from "@/utils/db/actions/speakers";

type SpeakerCreate = z.infer<typeof speakerCreateSchema>;

const AddSpeakerDialog = ({ conference_id }: { conference_id: number }) => {
  const form = useForm<SpeakerCreate>({
    resolver: zodResolver(speakerCreateSchema),
    defaultValues: {
      name: "",
      bio: "",
      conference_id: conference_id,
    },
  });

  async function action(formData: FormData) {
    dispatch(formData);

    return;
  }

  const [state, dispatch, isPending] = useActionState(
    async (prevState: unknown, payload: FormData) => {
      return await createSpeaker(payload);
    },
    undefined
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus size={24} />
          Add Speaker
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Speaker</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form action={action} className="space-y-4">
            <FormField
              control={form.control}
              name="conference_id"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="hidden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Speaker's bio..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="relative">
              Add Speaker
              {isPending && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <CircleDashed size={24} className="animate-spin" />
                </span>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSpeakerDialog;
