"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createConferenceSession(
  prev: unknown,
  formData: FormData
) {
  const supabase = await createClient();

  
}
