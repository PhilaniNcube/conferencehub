import {
  getConferences,
  getMyRegistrations,
  getProfile,
} from "@/utils/db/queries";
import React from "react";
import { ConferenceDetailsClient } from "../browse-conferences/_components/client-conference-details";
import SearchComponent from "../../_components/search-component";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/utils/searchParams";

const RegiteredConferences = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { term, page, limit } = await loadSearchParams(searchParams);

  const conferencesData = getMyRegistrations(term, page, limit);
  const user = getProfile();

  const [conferences, profile] = await Promise.all([conferencesData, user]);

  if (!conferences || !profile) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">Cannot load conferences</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-4">
        <h1 className="font-semibold text-3xl">My Conference Registrations</h1>
        <SearchComponent />
      </div>
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
