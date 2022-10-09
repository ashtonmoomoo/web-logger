import type { Handler } from "../types/index";

import { handlePost } from "../handlers/post";
import { handleGet } from "../handlers/get";

export const badRequest = (message: string) => {
  return new Response(message, {
    status: 400,
  });
};

const serverError = () => {
  return new Response("Internal server error.", {
    status: 500,
  });
};

const methodNotSupported: Handler = (_) => {
  return new Response("Method not supported.", { status: 405 });
};

export const getIdFromRequest = (request: Request) => {
  const url = new URL(request.url);
  return url.pathname.split("/")?.[1];
};

const methodHandlers: { [key: string]: Handler } = {
  GET: handleGet,
  POST: handlePost,
};

export const handler: Handler = (request) => {
  const id = getIdFromRequest(request);
  if (!id) {
    return badRequest("You must include an ID in the URL: [domainName]/$id");
  }

  const { method } = request;

  const thisMethodHandler =
    methodHandlers[method] || methodNotSupported(request);

  try {
    return thisMethodHandler(request);
  } catch (err) {
    console.error(err);
    return serverError();
  }
};
