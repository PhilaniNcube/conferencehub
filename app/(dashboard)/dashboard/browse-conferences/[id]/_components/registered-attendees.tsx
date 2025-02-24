import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getRegisteredAttendees } from "@/utils/db/queries";
import React from "react";

export async function RegisteredAttendees({
  conferenceId,
  max_attendees,
}: {
  conferenceId: number;
  max_attendees: number;
}) {
  const registeredAttendees = await getRegisteredAttendees(conferenceId);

  if (!registeredAttendees) {
    return null;
  }

  return (
    <div className="flex flex-col my-4">
      <div className="max-w-md flex flex-col space-y-2">
        <Badge variant="outline" className="w-fit">
          Registered Attendees: {registeredAttendees}
        </Badge>
        <Progress value={registeredAttendees} max={max_attendees} />
      </div>
    </div>
  );
}

export default RegisteredAttendees;
