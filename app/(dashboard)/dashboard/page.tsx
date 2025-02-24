import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/utils/db/queries";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const DashboardHomePage = async () => {
  const profile = await getProfile();

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="w-full flex justify-end">
        <Link href="/dashboard/create-conference">
          <Button>
            <CirclePlus className="h-4 w-4" />
            Create Conference
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHomePage;
