import {
  getConferences,
  getMyRegistrations,
  getProfile,
} from "@/utils/db/queries";
import React from "react";
import { ConferenceDetailsClient } from "../browse-conferences/_components/client-conference-details";

const RegiteredConferences = async () => {
  const conferencesData = getMyRegistrations();
  const user = getProfile();

  const [conferences, profile] = await Promise.all([conferencesData, user]);

  if (!conferences || !profile) {
    return (
      <div>
        <h1>Cannot load conferences</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>My Conference Registrations</h1>
      <div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
          {conferences?.map((conference) => (
            <ConferenceDetailsClient
              key={conference.id}
              conference={conference}
              currentUserId={profile?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegiteredConferences;
