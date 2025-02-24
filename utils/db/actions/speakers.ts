"use server";

import { createClient } from "@/utils/supabase/server";
import { speakerCreateSchema } from "../schema";
import { revalidatePath } from "next/cache";

export const createSpeaker = async (formData: FormData) => {
  const supabase = await createClient();

  const validatedFields = speakerCreateSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio"),
    conference_id: formData.get("conference_id"),
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  const { data, error } = await supabase
    .from("speakers")
    .insert({
      name: validatedFields.data.name,
      bio: validatedFields.data.bio,
      conference_id: validatedFields.data.conference_id,
    })
    .single();

  revalidatePath(
    `/dashboard/my-conferences/${validatedFields.data.conference_id}`
  );

  if (error) {
    return { error: error.message };
  }

  return data;
};

export const addPhotoToSpeaker = async (
  speakerId: string,
  image_url: string
) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("speakers")
    .update({ photo_url: image_url })
    .eq("id", speakerId)
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/dashboard/my-conferences`, "layout");

  return data;
};
