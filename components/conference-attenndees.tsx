import { getConferenceAttendees } from "@/utils/db/queries";
import React from "react";
import Attendee from "./attendee";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const ConferenceAttendees = async ({
  conferenceId,
}: {
  conferenceId: number;
}) => {
  const registrations = await getConferenceAttendees(conferenceId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendees </CardTitle>
        <small className="text-muted-foreground">
          {registrations?.length} Registrations
        </small>
      </CardHeader>
      <CardContent>
        <ul>
          {registrations?.map((registration) => (
            <Attendee key={registration.id} userId={registration.user_id} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ConferenceAttendees;
