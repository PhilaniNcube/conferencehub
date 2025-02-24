import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getConferences, getProfile, searchConferences } from "@/utils/db/queries";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { ConferenceDetailsClient } from "./browse-conferences/_components/client-conference-details";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchParams } from "nuqs";
import { loadSearchParams } from "@/utils/searchParams";
import SearchComponent from "../_components/search-component";

type DashboardHomePageProps = {
  searchParams: Promise<SearchParams>;
};

const DashboardHomePage = async ({searchParams}:DashboardHomePageProps) => {

  const {term, page, limit} = await loadSearchParams(searchParams);

  const conferencesData = searchConferences(term, page, limit);
  const user = getProfile();

  const [conferences, profile] = await Promise.all([conferencesData, user]);

  return (
    <div>
      <div className="w-full flex justify-between items-center">
       <SearchComponent />
        <Link href="/dashboard/create-conference">
          <Button>
            <CirclePlus className="h-4 w-4" />
            Create Conference
          </Button>
        </Link>
      </div>

      <div className="my-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profile &&
            conferences?.map((conference) => (
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

export default DashboardHomePage;
