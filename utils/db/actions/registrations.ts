"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import "server-only";

export async function registerForConference(conferenceId: number) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Error getting user");
  }

//   check if this user has already registered for this conference
    const { data: registrationsData, error: registrationsError } = await supabase
        .from("registrations")
        .select("*")
        .eq("conference_id", conferenceId)
        .eq("user_id", user.id);

//   if the user has already registered for this conference, return early
    if (registrationsData && registrationsData.length > 0) {
        return registrationsData;
    }

  try {
    // get the conference with the given id
    const { data: registrationData, error: registrationError } = await supabase
      .from("registrations")
      .insert([{ conference_id: conferenceId, user_id: user.id }]);

    if (error) {
      throw error;
    }

    return registrationData;
  } catch (error) {
    console.error(error);

    return null;
  } finally {
    revalidatePath(`/dashboard/browse-conferences/${conferenceId}`);
  }
}
