export const badRequest = (message: string) => {
  return new Response(message, {
    status: 400,
  });
};

export const notFound = (message?: string) => {
  return new Response(message || "Resource not found", {
    status: 404,
  });
};

export const methodNotSupported = () => {
  return new Response("Method not supported.", { status: 405 });
};

export const serverError = () => {
  return new Response("Internal server error.", {
    status: 500,
  });
};
