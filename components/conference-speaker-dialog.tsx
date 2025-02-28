import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format, parseISO } from "date-fns";
import { CalendarClock, User } from "lucide-react";
import { Button } from "./ui/button";
import { getSpeaker } from "@/utils/db/queries";

// Define the type for a conference speaker
type ConferenceSpeaker = {
  bio: string | null;
  conference_id: number;
  created_at: string | null;
  id: string;
  name: string;
  photo_url: string | null;
  updated_at: string | null;
};

// Get initials for avatar fallback
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

// Format date if it exists
const formatDate = (dateString: string | null) => {
  if (!dateString) return null;
  return format(parseISO(dateString), "MMMM d, yyyy");
};

export default async function ConferenceSpeakerDialog({
  speakerId,
}: {
  speakerId: string;
}) {
  const speaker = await getSpeaker(speakerId);

  if (!speaker) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="h-auto p-0">
          {speaker?.name || "Unknown Speaker"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 flex justify-center -mx-6 -mt-6 mb-6">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={speaker?.photo_url || ""} alt={speaker?.name} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {getInitials(speaker?.name)}
            </AvatarFallback>
          </Avatar>
        </DialogTitle>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{speaker.name}</h2>
        </div>

        <div className="space-y-4">
          {speaker.bio && (
            <div>
              <h3 className="font-medium mb-1">Biography</h3>
              <p className="text-sm text-muted-foreground">{speaker.bio}</p>
            </div>
          )}

          <div className="border-t pt-4 mt-4">
            <h3 className="font-medium text-sm mb-2">Conference Information</h3>
            <p className="text-sm text-muted-foreground">
              Conference ID: {speaker.conference_id}
            </p>

            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              {speaker.created_at && (
                <div className="flex items-center">
                  <CalendarClock className="h-3 w-3 mr-1" />
                  <span>Created: {formatDate(speaker.created_at)}</span>
                </div>
              )}

              {speaker.updated_at && (
                <div className="flex items-center">
                  <CalendarClock className="h-3 w-3 mr-1" />
                  <span>Updated: {formatDate(speaker.updated_at)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
