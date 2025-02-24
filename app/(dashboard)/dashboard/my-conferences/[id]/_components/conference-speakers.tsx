import { Button } from "@/components/ui/button";
import { getConferenceSpeakers } from "@/utils/db/queries";
import { ImagesIcon } from "lucide-react";
import React from "react";
import UploadSpeakerPhoto from "./upload-speaker-photo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ConferenceSpeakers = async ({
  conference_id,
}: {
  conference_id: number;
}) => {
  const speakers = await getConferenceSpeakers(conference_id);

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4">Speakers</h2>
      <div className="w-full">
        {speakers?.map((speaker) => (
          <div
            className="odd:bg-slate-100 even:bg-white flex justify-between items-center w-full p-2"
            key={speaker.id}
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{speaker.name[0]}</AvatarFallback>
                <AvatarImage src={speaker.photo_url!} alt={speaker.name} />
              </Avatar>
              <p>{speaker.name}</p>
            </div>
            <UploadSpeakerPhoto speakerId={speaker.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConferenceSpeakers;
