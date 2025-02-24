"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Conference } from "@/utils/db/schema";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface ConferenceDetailsClientProps {
  conference: Conference;
  currentUserId: string | null;
}

export function ConferenceDetailsClient({
  conference,
  currentUserId,
}: ConferenceDetailsClientProps) {
  const isCreator = currentUserId === conference.creator_id;

  return (
    <Card className="w-full max-w-3xl relative">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{conference.title}</CardTitle>
        {isCreator && (
          <Badge className="bg-green-500 absolute top-0 right-2 text-white w-fit">
            You are the creator
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {conference.image_url && (
          <div className="relative w-full h-64">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${conference.image_url}`}
              alt={conference.title}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">
            {new Date(conference.start_date).toLocaleDateString()} -{" "}
            {new Date(conference.end_date).toLocaleDateString()}
          </Badge>
          {conference.location && (
            <Badge variant="outline">{conference.location}</Badge>
          )}
          {conference.max_attendees && (
            <Badge variant="outline">
              Max Attendees: {conference.max_attendees}
            </Badge>
          )}
        </div>
        {conference.description && (
          <p className="text-muted-foreground my-3">{conference.description}</p>
        )}
        <Separator className="my-3" />
        {isCreator ? (
          <div className="flex gap-2">
            <Link href={`/dashboard/my-conferences/${conference.id}`}>
              <Button>Edit Conference</Button>
            </Link>
          </div>
        ) : (
          <div>
            <Link href={`/dashboard/browse-conferences/${conference.id}`}>
              <Button>View Conference</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
