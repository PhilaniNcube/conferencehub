"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { TablesInsert } from "@/utils/types";
import { sessionCreateSchema, sessionSchema, sessionUpdateSchema } from "../schema";




export async function createConferenceSession(
  prev: unknown,
  formData: FormData
) {
  const supabase = await createClient();



  const validatedFields = sessionCreateSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    start_time: formData.get("start_time"),
    end_time: formData.get("end_time"),
    conference_id: formData.get("conference_id"),
    speaker_id: formData.get("speaker_id"),
    session_date: formData.get("session_date"),
  });

  if (!validatedFields.success) {
    console.error("Error validating session fields:", validatedFields.error.flatten().fieldErrors);
    console.error("Validated session fields:", JSON.stringify(validatedFields, null, 2));
    return {
      error: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const sessionDate = new Date(validatedFields.data.session_date).toISOString();

  const {

    start_time,
    end_time,
    title,
    description,
    conference_id,
    speaker_id,
  } = validatedFields.data;

  console.log("Creating session with data:", sessionDate);

  
  // Insert the session into the database
  const { data, error } = await supabase
    .from("sessions")
    .insert({
      session_date: sessionDate,
      start_time,
      end_time,
      title,
      description,
      conference_id,
      speaker_id,
    })
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
  revalidatePath(
    `/dashboard/my-conferences/${conference_id}`,
    "page"
  );
  revalidatePath(
    `/dashboard/browse-conferences/${conference_id}`,
    "page"
  );

  return {
    success: true,
 
  };
}

export async function editSession(prev: unknown, formData: FormData) {
  const supabase = await createClient();
}
