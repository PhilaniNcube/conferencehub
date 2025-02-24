"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CircleDashed } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { isBefore } from "date-fns";
import {
  Conference,
  ConferenceCreateFormData,
  conferenceCreateSchema,
} from "@/utils/db/schema";
import {
  saveConference,
  updateConference,
} from "@/utils/db/actions/conference";
import { useActionState, useState } from "react";
import { toast } from "sonner";
import { ImageUpload } from "@/app/(dashboard)/_components/image-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CreateConferenceForm() {

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const form = useForm<ConferenceCreateFormData>({
    resolver: zodResolver(conferenceCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      max_attendees: 100,
      start_date: undefined,
      end_date: undefined,
    },
  });

  const startDate = form.watch("start_date");
  const endDate = form.watch("end_date");

  // write a function to make sure the end date is after the start date using the date-fns library
  function isEndDateInvalid(endDate: Date, startDate: Date) {
    return isBefore(endDate, startDate);
  }

  const [state, dispatch, isPending] = useActionState(
    async (previous: undefined | Conference, payload: FormData) => {
      let result;

      if (previous) {
        result = await updateConference(previous.id, payload);
        toast("Conference updated successfully", {
          position: "top-right",
          duration: 3000,
          description: "Your conference has been updated successfully",
        });
        return result;
      } else {
        result = await saveConference(payload);
      }

      if (!result) {
        await toast("Failed to create conference", {
          position: "top-right",
          duration: 3000,
          description: "An error occurred while creating your conference",
        });

        return;
      }

      await toast("Conference created successfully", {
        position: "top-right",
        duration: 3000,
        description: "Your conference has been created successfully",
      });

      return result;
    },
    undefined
  );

  async function action(formData: FormData) {
    dispatch(formData);
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 space-y-8">
      <Form {...form}>
        <form className="space-y-8 flex-1" action={action}>
          <h2 className="text-2xl font-semibold">Create a new conference</h2>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Conference Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter conference title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter conference description"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div>
                          <Button
                            type="button"
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                          <Input
                            type="hidden"
                            {...field}
                            value={field.value ? field.value.toISOString() : ""}
                          />
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        onDayClick={(date) => field.onChange(date)}
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel
                    className={cn(
                      isEndDateInvalid(endDate, startDate) && "text-red-600"
                    )}
                  >
                    End Date
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div>
                          <Button
                            type="button"
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleDateString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                          <Input
                            type="hidden"
                            {...field}
                            value={field.value ? field.value.toISOString() : ""}
                          />
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        onDayClick={(date) => field.onChange(date)}
                      />
                    </PopoverContent>
                  </Popover>

                  {isEndDateInvalid(new Date(field.value), startDate) && (
                    <FormMessage>
                      End date must be after start date.
                    </FormMessage>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter conference location" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_attendees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Attendees</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter max number of attendees"
                    {...field}
                    onChange={(e) =>
                      field.onChange(Number.parseInt(e.target.value, 10))
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="relative" disabled={isPending}>
            {isPending && (
              <div className="absolute inset-0">
                <div className="flex items-center justify-center h-full">
                  <CircleDashed className="animate-spin h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            )}
            Create Conference
          </Button>
        </form>
      </Form>
      {state?.id && (

        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload conference_id={state.id} />
           
          </CardContent>
        </Card>
      )}
    </div>
  );
}
