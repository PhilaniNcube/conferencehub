"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Profile, profileUpdateSchema } from "@/utils/db/schema";
import { updateProfileAction } from "@/utils/db/actions/profile";

export default function ProfileForm({ profile }: { profile: Profile }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof profileUpdateSchema>>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      first_name: profile.first_name || "",
      last_name: profile.last_name || "",
    },
  });

  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    null
  );

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-8 max-w-sm">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}
