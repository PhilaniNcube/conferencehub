"use server";
import 'server-only';

import { createClient } from "@/utils/supabase/server";
import { profileUpdateSchema } from '../schema';
import { revalidatePath } from 'next/cache';

export const updateProfileAction = async (prevState:unknown, formData: FormData) => {

    const validatedFields = profileUpdateSchema.safeParse({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
    })

    if (!validatedFields.success) {
        return {
            success: false,
            first_name: validatedFields.error.flatten().fieldErrors.first_name,
            last_name: validatedFields.error.flatten().fieldErrors.last_name,
            error: "Invalid fields",
        };
    }

    const supabase = await createClient();
    const { data:{user}, error } = await supabase.auth.getUser();

    if (error || !user) {
        return {
            success: false,
            error: "User not found",
        };
    }

    const { first_name, last_name } = validatedFields.data;

    const {data, error: profileError} = await supabase
        .from("profiles").update({
            first_name,
            last_name,
            updated_at: new Date().toISOString(),
        }).eq("id", user.id).select("*").single();

    if (profileError) {
        return {
            success: false,
            error: profileError.message,
        };
    } 

    revalidatePath("/profile");
    
    return {
        success: true,
        data,
    };


}
