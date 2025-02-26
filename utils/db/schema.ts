import { z } from "zod";
import type { Tables, TablesUpdate } from "../types";

export type Profile = Tables<"profiles">;
export type ProfileUpdate = TablesUpdate<"profiles">;
export type ProfileCreate = Omit<Profile, "id">;

export type Conference = Tables<"conferences">;
export type ConferenceUpdate = TablesUpdate<"conferences">;
export type ConferenceCreate = Omit<Conference, "id">;

export type Session = Tables<"sessions">;
export type SessionUpdate = TablesUpdate<"sessions">;
export type SessionCreate = Omit<Session, "id">;

export type Speaker = Tables<"speakers">;
export type SpeakerUpdate = TablesUpdate<"speakers">;
export type SpeakerCreate = Omit<Speaker, "id">;

export const profileSchema = z.object({
  first_name: z.string().min(1).max(255).nullish(),
  last_name: z.string().min(1).max(255).nullish(),
});

export const profileUpdateSchema = profileSchema.partial();

export const conferenceSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10).max(255),
  start_date: z.date(),
  end_date: z.date(),
  location: z.string().min(3).max(255),
  max_attendees: z.number().int().positive(),
});

export const conferenceUpdateSchema = conferenceSchema.partial().and(
  z.object({
    id: z.coerce.number(),
  })
);
export const conferenceCreateSchema = conferenceSchema;

export const speakerSchema = z.object({
  name: z.string().min(3).max(255),
  bio: z.string().min(10).max(255),
  photo_url: z.string().url(),
  created_at: z.date(),
  updated_at: z.date(),
  id: z.string().uuid(),
  conference_id: z.coerce.number(),
});

export const speakerUpdateSchema = speakerSchema.partial();

export const speakerCreateSchema = speakerSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  photo_url: true,
});

export const sessionSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(10).max(255),
  start_time: z.string(),
  end_time: z.string(),
  conference_id: z.coerce.number().int().positive(),
  speaker_id: z.string().uuid(),
  session_date: z.string(),
  created_at: z.date() || undefined,
  updated_at: z.date() || undefined,
  id: z.coerce.number(),
});

export const sessionUpdateSchema = sessionSchema.partial().and(
  z.object({
    id: z.coerce.number(),
  })
);

export const sessionCreateSchema = sessionSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type ProfileFormData = z.infer<typeof profileSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type ConferenceFormData = z.infer<typeof conferenceSchema>;
export type ConferenceUpdateFormData = z.infer<typeof conferenceUpdateSchema>;
export type ConferenceCreateFormData = z.infer<typeof conferenceCreateSchema>;
