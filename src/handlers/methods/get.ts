import type { Handler } from "../../types/index.ts";

import { Entry, getLogJSON } from "../../logging/log.ts";
import { getIdFromRequest } from "../utils/index.ts";
import { notFound } from "../utils/errorResponses.ts";

const getMostRecentEntry = (entries: Entry[]) => {
  const entriesCopy = [...entries];

  entriesCopy.sort((a, b) => {
    return Number(new Date(b.created)) - Number(new Date(a.created));
  });

  return entriesCopy[0];
};

export const handleGet: Handler = (request) => {
  const id = getIdFromRequest(request);
  const log = getLogJSON();

  if (!log[id]) {
    return notFound(`Logs for ${id} weren't able to be found.`);
  }

  const mostRecentEntry = getMostRecentEntry(log[id]);

  return new Response(JSON.stringify(mostRecentEntry));
};
