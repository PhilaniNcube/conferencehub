import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Conference } from "@/utils/db/schema";
import UpdateConferenceTitle from "./update-conference-title-dialog";
import UpdateConferenceDescription from "./update-conference-description";
import { Button } from "@/components/ui/button";
import UpdateConferenceDates from "./update-conference-dates";
import { Separator } from "@/components/ui/separator";
import UpdateConferenceLocation from "./update-conference-location";
import UpdateConferenceAttendees from "./update-conference-attendees";
import { ImageUpload } from "@/app/(dashboard)/_components/image-upload";

export async function ConferenceDetails({
  conference,
}: {
  conference: Conference;
}) {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {conference.title}
          <UpdateConferenceTitle id={conference.id} title={conference.title} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {conference.image_url && (
          <div className="relative w-full h-64">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${conference.image_url}`}
              alt={conference.title}
              width={1920}
              height={1080}
              className="rounded-md h-full object-cover aspect-auto"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            {new Date(conference.start_date).toLocaleDateString()} -{" "}
            {new Date(conference.end_date).toLocaleDateString()}
            <Separator orientation="vertical" className="mx-3" />
            <div className="text-xs">
              <UpdateConferenceDates
                id={conference.id}
                start_date={conference.start_date}
                end_date={conference.end_date}
              />
            </div>
          </Badge>
          {conference.location && (
            <Badge variant="outline">
              {conference.location}
              <Separator orientation="vertical" className="mx-3" />
              <div className="text-xs">
                <UpdateConferenceLocation
                  id={conference.id}
                  location={conference.location}
                />
              </div>
            </Badge>
          )}
          {conference.max_attendees && (
            <Badge variant="outline">
              Max Attendees: {conference.max_attendees}
              <Separator orientation="vertical" className="mx-3" />
              <div className="text-xs">
                <UpdateConferenceAttendees
                  id={conference.id}
                  attendees={conference.max_attendees}
                />
              </div>
            </Badge>
          )}
        </div>
        {conference.description && (
          <div className=" flex flex-col">
            <p>{conference.description}</p>
            <div className="flex justify-end">
              <UpdateConferenceDescription
                id={conference.id}
                description={conference.description}
              />
            </div>
          </div>
        )}
        <Separator />
        <h2 className="text-xl font-bold">Upload Image</h2>
       <ImageUpload conference_id={conference.id} />
      </CardContent>
    </Card>
  );
}
