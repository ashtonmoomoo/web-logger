import type { Handler } from "../types/index.ts";

import { handleDelete, handleGet, handlePost } from "./methods/index.ts";
import {
  badRequest,
  methodNotSupported,
  serverError,
} from "./utils/errorResponses.ts";
import { getIdFromRequest } from "./utils/index.ts";

const methodHandlers: Record<string, Handler> = {
  GET: handleGet,
  POST: handlePost,
  DELETE: handleDelete,
};

export const handler: Handler = (request) => {
  const id = getIdFromRequest(request);
  if (!id) {
    return badRequest("You must include an ID in the URL.");
  }

  const { method } = request;

  const thisMethodHandler = methodHandlers[method] || methodNotSupported();

  try {
    return thisMethodHandler(request);
  } catch (err) {
    console.error(err);
    return serverError();
  }
};
