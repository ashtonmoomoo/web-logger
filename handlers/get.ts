import { badRequest } from "../mod.ts";
import { Entry, getLogJSON } from "../logging/log.ts";

const getMostRecentEntry = (entries: Entry[]) => {
  const entriesCopy = [...entries];

  entriesCopy.sort((a, b) => {
    return Number(new Date(b.created)) - Number(new Date(a.created));
  });

  return entriesCopy[0];
};

export const handleGet = (id: string): Response => {
  const log = getLogJSON();

  if (!log[id]) {
    return badRequest(`No logs exist for id ${id}`);
  }

  const mostRecentEntry = getMostRecentEntry(log[id]);

  return new Response(JSON.stringify(mostRecentEntry));
};
