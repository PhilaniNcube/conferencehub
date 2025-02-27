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
import { CalendarIcon, Clock, Clock10Icon, MapPin, Users } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  differenceInHours,
  differenceInMinutes,
  format,
  formatDate,
  subHours,
} from "date-fns";
import EditSessionTime from "./edit-session-time";
import EditSessionTitle from "./edit-session-title";
import EditSessionDescription from "./edit-session-description";
import SessionSpeaker from "./session-speaker";

const ListConferenceSessions = async ({
  conference_id,
  children,
}: {
  conference_id: number;
  children?: React.ReactNode;
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
                  {/* Calculate the session duration */}

                  {session.start_time && session.end_time && (
                    <div className="text-sm">
                      {session.start_time} - {session.end_time}
                      <EditSessionTime session={session} />
                    </div>
                  )}
                </div>{" "}
                <CardDescription className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1 text-black" />
                  {formatDate(session.session_date, "P")}
                </CardDescription>
              </div>
              <CardTitle className="">
                {session.title}
                <EditSessionTitle session={session} />
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-muted-foreground">
                {session.description || "No description provided"}
              </p>
              <EditSessionDescription session={session} />
            </CardContent>
            <CardFooter>
              <SessionSpeaker speaker_id={session.speaker_id} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListConferenceSessions;
