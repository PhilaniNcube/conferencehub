import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getMyConferences } from "@/utils/db/queries";
import { format } from "date-fns";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const MyConferencesPage = async () => {
  const mycConferences = await getMyConferences();

  if (!mycConferences || mycConferences.length === 0) {
    return (
      <div className="flex justify-between items-center h-full">
        <h1 className="text-2xl font-bold">
          You haven't created any conferences yet.
        </h1>
        <Link href="/dashboard/create-conference">
          <Button type="button">
            <CirclePlus className="h-5 w-5 mr-2" />
            Create Conference
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link href="/dashboard/create-conference" className="w-full flex justify-end mb-3">
        <Button type="button">
          <CirclePlus className="h-5 w-5 mr-2" />
          Create Conference
        </Button>
      </Link>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mycConferences.map((conference) => (
          <Card key={conference.id}>
            <CardHeader>
              <CardTitle>{conference.title}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                From: {format(new Date(conference.start_date), "dd/MM/yyyy")} -
                To: {format(new Date(conference.end_date), "dd/MM/yyyy")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-md line-clamp-2">{conference.description}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/my-conferences/${conference.id}`}>
                <Button type="button">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyConferencesPage;
