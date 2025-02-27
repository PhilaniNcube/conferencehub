import {
  getConference,
  getConferenceSessions,
  getConferenceSpeakers,
} from "@/utils/db/queries";
import React from "react";
import { ConferenceDetails } from "./_components/conference-details";
import AddSpeakerDialog from "./_components/add-speaker";
import ConferenceSpeakers from "./_components/conference-speakers";
import CreateSession from "./_components/create-session";
import { Separator } from "@radix-ui/react-dropdown-menu";
import ListConferenceSessions from "./_components/list-conference-sessions";

const ConferencePage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;

  const conference = await getConference(id);

  if (!conference) {
    return <div>Conference not found</div>;
  }

  let speakers = await getConferenceSpeakers(id);

  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-6">Conference Details</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <ConferenceDetails conference={conference} />
        <div className="w-full">
          <AddSpeakerDialog conference_id={conference.id} />
          <div className="mt-6 max-w-xl w-full">
            <ConferenceSpeakers conference_id={conference.id} />
          </div>
          <Separator className="my-3" />
          <CreateSession conference={conference} speakers={speakers || []} />
          <Separator className="my-3" />
          <ListConferenceSessions conference_id={conference.id} />
        </div>
      </div>
    </div>
  );
};

export default ConferencePage;
