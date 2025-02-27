import { getSpeaker } from "@/utils/db/queries";
import React from "react";

const SessionSpeaker = async ({ speaker_id }: { speaker_id: string }) => {
  const speaker = await getSpeaker(speaker_id);

  return <p className="text-lg font-bold">{speaker?.name}</p>;
};

export default SessionSpeaker;
