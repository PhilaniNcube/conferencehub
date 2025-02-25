"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { TablesInsert } from "@/utils/types";

export async function createConferenceSession(
  prev: unknown,
  formData: FormData
) {
  const supabase = await createClient();

  // Extract values from form data
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;
  const conference_id = parseInt(formData.get("conference_id") as string);
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;
  const speaker_id = formData.get("speaker_id") as string | null;

  // Validate required fields
  if (!title || !conference_id || !start_time || !end_time) {
    return {
      error: "Missing required fields",
      success: false,
    };
  }

  // Create session object matching the table schema
  const sessionData: TablesInsert<"sessions"> = {
    title,
    description,
    conference_id,
    start_time,
    end_time,
    speaker_id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Insert the session into the database
  const { data, error } = await supabase
    .from("sessions")
    .insert(sessionData)
    .select()
    .single();

  if (error) {
    console.error("Error creating session:", error);
    return {
      error: error.message,
      success: false,
    };
  }

  // Revalidate the conferences page to show updated data
  revalidatePath(`/dashboard/my-conferences/${conference_id}`, "page");
  revalidatePath(`/dashboard/browse-conferences/${conference_id}`, "page");

  return {
    success: true,
  };
}
