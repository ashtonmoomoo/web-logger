import type { Handler } from "../types/index.ts";

import { badRequest, getIdFromRequest } from "./handler.ts";
import { createLog } from "../logging/log.ts";
import { MAX_CONTENT_LENGTH } from "../config.ts";

interface ExpectedBody {
  content: string;
}

export const handlePost: Handler = async (request) => {
  const id = getIdFromRequest(request);
  const { content }: ExpectedBody = await request.json();

  if (!content) {
    return badRequest("Missing content attribute on body.");
  }

  if (content.length > MAX_CONTENT_LENGTH) {
    return badRequest(
      `Log content exceeded max length of ${MAX_CONTENT_LENGTH}`
    );
  }

  createLog(id, content);

  return new Response(`Created log for ID ${id}.`);
};