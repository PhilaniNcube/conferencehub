import { getUserProfile } from "@/utils/db/queries";
import React from "react";

const Attendee = async ({ userId }: { userId: string }) => {
  const profile = await getUserProfile(userId);

  return (
    <div>
      <p>
        {profile?.first_name} {profile?.last_name} <br />
        {profile?.email}
      </p>
    </div>
  );
};

export default Attendee;
