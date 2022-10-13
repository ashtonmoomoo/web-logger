import type { Handler } from "../../types/index.ts";

import { deleteLogs } from "../../logging/log.ts";
import { badRequest } from "../utils/errorResponses.ts";
import { getIdFromRequest } from "../utils/index.ts";

export const handleDelete: Handler = (request) => {
  const id = getIdFromRequest(request);

  if (!id) {
    return badRequest(`No logs exist for id ${id}`);
  }

  deleteLogs(id);

  return new Response(`Logs for ${id} deleted`);
};
