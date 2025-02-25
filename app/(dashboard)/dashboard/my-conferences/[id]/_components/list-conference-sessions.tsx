import { getConferenceSessions } from "@/utils/db/queries";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { differenceInHours, differenceInMinutes, format, formatDate, subHours } from "date-fns";

const ListConferenceSessions = async ({
  conference_id,
}: {
  conference_id: number;
}) => {
  let conferenceSessions = await getConferenceSessions(conference_id);

  if (!conferenceSessions || conferenceSessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">No sessions found</h3>
        <p className="text-muted-foreground">
          There are no sessions scheduled for this conference yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sessions</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {conferenceSessions.map((session) => (
          <Card key={session.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1 text-black" />
                  {/* Calculate the session duration */}

                  {session.start_time && session.end_time && (
                    <>
                      {differenceInMinutes(
                        new Date(session.end_time),
                        new Date(session.start_time)
                      )}{" "}
                      minutes
                    </>
                  )}
                </div>
              </div>
              <CardTitle className="line-clamp-2">{session.title}</CardTitle>
              <CardDescription className="flex items-center text-xs">
                <CalendarIcon className="h-3 w-3 mr-1 text-black" />
               Start Time {format(session.start_time, 'dd/mm/yyyy h:mm a') || "Date TBD"}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {session.description || "No description provided"}
              </p>

              {/* {session.speakers && session.speakers.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center gap-1 text-xs mb-2">
                    <Users className="h-3 w-3" />
                    <span className="font-semibold">Speakers</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {session.speakers.map((speaker) => (
                      <Badge key={speaker.id} variant="outline">
                        {speaker.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )} */}
            </CardContent>

            <CardFooter className="flex justify-end pt-2 border-t">
              <Button variant="ghost" size="sm">
                View Details
              </Button>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListConferenceSessions;
