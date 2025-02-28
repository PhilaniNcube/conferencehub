import { getUserProfile } from "@/utils/db/queries";
import React from "react";

const Attendee = async ({ userId }: { userId: string }) => {
  const profile = await getUserProfile(userId);

  return (
    <div>
      {profile?.first_name && profile?.last_name ? (
        <p>
          {profile?.first_name} {profile?.last_name} <br />
        </p>
      ) : null}
    </div>
  );
};

export default Attendee;
