import { parseAsFloat, createLoader, parseAsString } from 'nuqs/server'

export const conferenceSearchParams = {
  page: parseAsFloat.withDefault(1),
  limit: parseAsFloat.withDefault(10),
  term: parseAsString.withDefault(''), 
}

// create a loader for the search params
export const loadSearchParams = createLoader(conferenceSearchParams)