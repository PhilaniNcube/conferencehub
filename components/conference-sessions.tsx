import { getConferenceSessions } from "@/utils/db/queries";
import { Session } from "@/utils/db/schema";
import { format, parseISO } from "date-fns";
import { CalendarDays, Clock, User } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ConferenceSpeakerDialog from "./conference-speaker-dialog";

function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const date = new Date();
  date.setHours(Number.parseInt(hours, 10));
  date.setMinutes(Number.parseInt(minutes, 10));
  return format(date, "h:mm a");
}

// Helper function to format date (from "YYYY-MM-DD" to "Month DD, YYYY")
function formatDate(dateString: string): string {
  return format(parseISO(dateString), "MMMM d, yyyy");
}

const ConferenceSessions = async ({
  conference_id,
}: {
  conference_id: number;
}) => {
  const sessions = await getConferenceSessions(conference_id);

  if (!sessions || sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">No sessions found</h3>
        <p className="text-muted-foreground">
          There are no sessions scheduled for this conference yet.
        </p>
      </div>
    );
  }

  // Group sessions by date
  const sessionsByDate = sessions.reduce(
    (acc, session) => {
      const date = session.session_date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(session);
      return acc;
    },
    {} as Record<string, Session[]>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Conference Sessions</h1>

      {Object.entries(sessionsByDate).map(([date, dateSessions]) => (
        <div key={date} className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" />
            {formatDate(date)}
          </h2>

          <div className="grid gap-4">
            {dateSessions.map((session) => (
              <Card key={session.id} className="h-full">
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    {session.title}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center mt-2">
                      <User className="mr-2 h-4 w-4" />
                      <p className="text-slate-900 font-medium">Speaker: </p>
                      <ConferenceSpeakerDialog speakerId={session.speaker_id} />
                    </div>
                    <div className="flex items-center mt-1">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>
                        {formatTime(session.start_time)} -{" "}
                        {formatTime(session.end_time)}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    {session.description}
                  </p>
                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>Session ID: {session.id}</p>
                    <p>Conference ID: {session.conference_id}</p>
                    {session.created_at && (
                      <p>
                        Created:{" "}
                        {format(parseISO(session.created_at), "MMM d, yyyy")}
                      </p>
                    )}
                    {session.updated_at && (
                      <p>
                        Updated:{" "}
                        {format(parseISO(session.updated_at), "MMM d, yyyy")}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConferenceSessions;
