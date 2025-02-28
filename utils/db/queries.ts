import { createClient } from "@/utils/supabase/server";
import "server-only";

// get the profile of the current user
export const getProfile = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      throw error;
    }

    const { user } = data;

    // get the profile of the current user from the database
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      throw profileError;
    }

    return profileData;
  } catch (error) {
    console.error(error);

    return null;
  }
};

// get the profile of a user
export const getUserProfile = async (userId: string) => {
  const supabase = await createClient();

  try {
    // get the profile of the user with the given id
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error || !data) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

// get the lists of conferences that a user has created
export const getMyConferences = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data) {
      throw new Error("Error getting user");
    }

    const { user } = data;

    // get the conferences created by the current user
    const { data: conferenceData, error: conferenceError } = await supabase
      .from("conferences")
      .select("*")
      .eq("creator_id", user.id);

    if (conferenceError) {
      throw conferenceError;
    }

    return conferenceData;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export const getConference = async (id: number) => {
  const supabase = await createClient();

  try {
    // get the conference with the given id
    const { data, error } = await supabase
      .from("conferences")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
};

export async function getConferences() {
  const supabase = await createClient();

  try {
    // get all conferences
    const { data, error } = await supabase.from("conferences").select("*");

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getRegisteredAttendees(conferenceId: number) {
  const supabase = await createClient();

  try {
    // get all registrations for the given conference
    const { error, count } = await supabase
      .from("registrations")
      .select("*", { count: "exact" })
      .eq("conference_id", conferenceId);

    if (error) {
      throw error;
    }

    return count;
  } catch (error) {
    console.error(error);

    return 0;
  }
}

export async function getConferenceAttendees(conferenceId: number) {
  const supabase = await createClient();

  try {
    // get all registrations for the given conference
    const { data, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("conference_id", conferenceId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getConferenceSpeakers(conferenceId: number) {
  const supabase = await createClient();

  try {
    // get all speakers for the given conference
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .eq("conference_id", conferenceId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function searchConferences(
  term: string,
  page: number,
  limit: number
) {
  const supabase = await createClient();

  try {
    if (!term) {
      // if no search term is provided, return all conferences
      const { data, error } = await supabase
        .from("conferences")
        .select("*")
        .limit(limit)
        .range((page - 1) * limit, page * limit);

      if (error) {
        throw error;
      }

      return data;
    }

    // search for conferences with the given term
    const { data, error } = await supabase
      .from("conferences")
      .select("*")
      .textSearch("title", term)
      .limit(limit)
      .range((page - 1) * limit, page * limit);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getConferenceSessions(conferenceId: number) {
  const supabase = await createClient();

  try {
    // get all sessions for the given conference
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .eq("conference_id", conferenceId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function getSpeaker(speakerId: string) {
  const supabase = await createClient();

  try {
    // get the speaker with the given id
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .eq("id", speakerId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);

    return null;
  }
}

// get the conferences that a user has registered for
export const getMyRegistrations = async () => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data) {
      throw new Error("Error getting user");
    }

    const { user } = data;

    // get the registrations of the current user
    const { data: registrationData, error: registrationError } = await supabase
      .from("registrations")
      .select("*")
      .eq("user_id", user.id);

    if (registrationError) {
      throw registrationError;
    }

    // get the conferences that the user has registered for
    const conferenceIds = registrationData.map(
      (registration) => registration.conference_id
    );

    const { data: conferenceData, error: conferenceError } = await supabase
      .from("conferences")
      .select("*")
      .in("id", conferenceIds);

    if (conferenceError) {
      throw conferenceError;
    }

    return conferenceData;
  } catch (error) {
    console.error(error);

    return null;
  }
};
