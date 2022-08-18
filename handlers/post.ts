import { badRequest } from "../mod.ts";
import { createLog } from "../logging/log.ts";
import { MAX_CONTENT_LENGTH } from "../config.ts";

interface ExpectedBody {
  content: string;
}

export const handlePost = async (
  id: string,
  req: Request
): Promise<Response> => {
  const { content }: ExpectedBody = await req.json();

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
