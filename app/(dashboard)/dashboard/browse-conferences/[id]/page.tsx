import { getConference, getProfile } from "@/utils/db/queries";
import React from "react";
import { ConferenceDetails } from "./_components/conference-details";
import RegisteredAttendees from "./_components/registered-attendees";

const ConferencePage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {

    const { id } = await params;

    const conference = await getConference(id);
    const profile = await getProfile();

    
    if (!conference) {
        return <div>Cannot load conference</div>;
    }

    const isCreator = profile?.id === conference?.creator_id;

  return (
    <div>
     
      <div>
        <ConferenceDetails conference={conference} isCreator={isCreator} >
        <RegisteredAttendees conferenceId={conference.id} max_attendees={conference.max_attendees || 10} />
         </ConferenceDetails>
      </div>
    </div>
  )
};

export default ConferencePage;
