import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getProfile } from "@/utils/db/queries";
import React from "react";

const ProfileCard = async () => {
  const profile = await getProfile();

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="mt-4 flex items-center gap-2 px-2">
      <Avatar>
        <AvatarImage src="/avatars/user.png" alt="User" />
        <AvatarFallback>{profile.first_name?.at(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {profile.first_name} {profile.last_name}
        </span>
      </div>
    </div>
  );
};

export default ProfileCard;
