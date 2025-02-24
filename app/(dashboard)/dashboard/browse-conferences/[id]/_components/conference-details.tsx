"use client";

import { use, useState, useTransition } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, CircleDashed, MapPin, Users } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Conference } from "@/utils/db/schema";
import { registerForConference } from "@/utils/db/actions/registrations";
import RegisteredAttendees from "./registered-attendees";

interface ConferenceDetailsClientProps {
  conference: Conference;
  isCreator: boolean;
  children: React.ReactNode;
}

export function ConferenceDetails({
  conference,
  isCreator,
  children
}: ConferenceDetailsClientProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <div className="flex justify-between items-start">
       
          <CardTitle className="text-3xl font-bold">
            {conference.title}
          </CardTitle>
          {isCreator && (
            <Badge className="bg-green-500 text-white w-fit">
              You are the creator
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {conference.image_url && (
          <>
            <div
              className="relative w-full h-64 cursor-pointer"
              onClick={() => setIsImageModalOpen(true)}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${conference.image_url}`}
                alt={conference.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
            <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{conference.title}</DialogTitle>
                </DialogHeader>
                <div className="relative w-full h-[60vh]">
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_IMAGE_URL}${conference.image_url}` ||
                      "/placeholder.svg"
                    }
                    alt={conference.title}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span>
              {new Date(conference.start_date).toLocaleDateString()} -{" "}
              {new Date(conference.end_date).toLocaleDateString()}
            </span>
          </div>
          {conference.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span>{conference.location}</span>
            </div>
          )}
          {conference.max_attendees && (
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>Max Attendees: {conference.max_attendees}</span>
            </div>
          )}
        </div>
        {conference.description && (
          <div>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-muted-foreground">{conference.description}</p>
          </div>
        )}
        <div className="text-sm text-muted-foreground">
          <p>Created: {new Date(conference.created_at!).toLocaleString()}</p>
          {conference.updated_at && (
            <p>
              Last Updated: {new Date(conference.updated_at).toLocaleString()}
            </p>
          )}
        </div>
        <div>
          {children}
        </div>
        <div className="flex gap-2">
          <form>
            <Button
              className="relative w-[150px]"
              type="submit"
              disabled={isPending}
              formAction={() => {
                startTransition(() => {
                  console.log("Registering for conference");
                  registerForConference(conference.id);
                });
              }}
            >
              Register
              {isPending && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <CircleDashed className="animate-spin h-5 w-5" />
                </span>
              )}
            </Button>
          </form>
          {isCreator && (
            <>
              <Button variant="outline">Edit Conference</Button>
              <Button variant="destructive">Delete Conference</Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
