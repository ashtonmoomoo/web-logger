import { serve } from "https://deno.land/std@0.152.0/http/server.ts";
import { handlePost } from "./handlers/post.ts";
import { handleGet } from "./handlers/get.ts";
import { PORT } from "./config.ts";

export const badRequest = (message: string) => {
  return new Response(message, {
    status: 400,
  });
};

const handler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  const id = url.pathname.split("/")?.[1];
  if (!id) {
    return badRequest("You must include an ID in the URL: [domainName]/$id");
  }

  const { method } = request;

  switch (method) {
    case "GET":
      return handleGet(id);

    case "POST":
      return await handlePost(id, request);

    case "DELETE":
      throw new Error("not implemented");

    default:
      return badRequest("Unrecognised HTTP method.");
  }
};

await serve(handler, { port: PORT });
