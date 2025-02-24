import { getProfile } from "@/utils/db/queries";
import React from "react";
import ProfileForm from "./_components/profile-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";


const ProfilePage = async () => {
  const profile = await getProfile();

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return <div className="container mx-auto">
    <div className="">
    <div className="bg-slate-900 text-white p-2 rounded mb-3 flex justify-end">
      <Link href="/dashboard">
       <Button className="bg-white text-slate-900 hover:bg-slate-600 hover:text-slate-50">Visit Dashboard</Button>
      </Link>
      </div> 
    <ProfileForm profile={profile} />
    </div>
  </div>;
};

export default ProfilePage;
