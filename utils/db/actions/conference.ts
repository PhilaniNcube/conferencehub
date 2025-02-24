"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveConference(formData:FormData) {
    const supabase = await createClient();
    // TODO: Implement this function

    let entries = Object.fromEntries(formData.entries());
    
  const {data:{user}, error} =  await supabase.auth.getUser();

    if (error || !user) {
        console.error('Error getting user')
        return
    }

    const conferenceData = {
        title: String(entries.title),
        description: entries.description?.toString() || null,
        start_date: entries.start_date.toString(),
        end_date: entries.end_date.toString(),
        location: entries.location?.toString() || null,
        max_attendees: Number(entries.max_attendees),
        creator_id: user.id
      };
    
   const result = await supabase.from('conferences').insert(conferenceData).select('*').single();
   
    if (result.error) {
         console.error('Error saving conference', result.error)
         return 
    }

    console.log('Conference saved', result.data)
    return result.data
    
}

export async function updateConference(id:number, formData:FormData) {
    const supabase = await createClient();

    let entries = Object.fromEntries(formData.entries());

    const conferenceData = {
        title: String(entries.title),
        description: entries.description?.toString() || null,
        start_date: entries.start_date.toString(),
        end_date: entries.end_date.toString(),
        location: entries.location?.toString() || null,
        max_attendees: Number(entries.max_attendees),
      };

    const result = await supabase.from('conferences').update(conferenceData).eq('id', id).select('*').single();

    if (result.error) {
        console.error('Error updating conference', result.error)
        return 
    }

    console.log('Conference updated', result.data)

    return result.data

}

export async function updateConferenceTitle(id:number, title:string) {
    const supabase = await createClient();

    const result = await supabase.from('conferences').update({title}).eq('id', id).select('*').single();

    if (result.error) {
        console.error('Error updating conference title', result.error)
        return 
    }

    console.log('Conference title updated', result.data)

    revalidatePath(`/dashboard/my-conferences/${id}`)

    return result.data

}

export async function deleteConference(id:number) {
    const supabase = await createClient();

    const result = await supabase.from('conferences').delete().eq('id', id).select('*').single();

    if (result.error) {
        console.error('Error deleting conference', result.error)
        return 
    }

    console.log('Conference deleted', result.data)

    revalidatePath(`/dashboard/my-conferences`)

    return result.data

}


export async function updateConferenceAttendees(id:number, attendees:number) {
    const supabase = await createClient();

    const result = await supabase.from('conferences').update({max_attendees: attendees}).eq('id', id).select('*').single();

    if (result.error) {
        console.error('Error updating conference attendees', result.error)
        return 
    }

    console.log('Conference attendees updated', result.data)

    revalidatePath(`/dashboard/my-conferences/${id}`)

    return result.data
}

export async function updateConferenceLocation(id:number, location:string) {
    const supabase = await createClient();

    const result = await supabase.from('conferences').update({location}).eq('id', id).select('*').single();

    if (result.error) {
        console.error('Error updating conference location', result.error)
        return 
    }

    console.log('Conference location updated', result.data)

      revalidatePath(`/dashboard/my-conferences/${id}`)
    return result.data
}

export async function updateConferenceDescription(id:number, description:string) {
    const supabase = await createClient();

    const result = await supabase.from('conferences').update({description}).eq('id', id).select('*').single();

    if (result.error) {
        console.error('Error updating conference description', result.error)
        return 
    }

    console.log('Conference description updated', result.data)

    revalidatePath(`/dashboard/my-conferences/${id}`)

    return result.data
}

export async function updateConferenceDates(id:number, start_date:string, end_date:string) {
    const supabase = await createClient();

    const result = await supabase.from('conferences').update({start_date, end_date}).eq('id', id).select('*').single();

    if (result.error) {
        console.error('Error updating conference dates', result.error)
        return 
    }

    console.log('Conference dates updated', result.data)

    revalidatePath(`/dashboard/my-conferences/${id}`)

    return result.data
}