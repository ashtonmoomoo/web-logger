export const getIdFromRequest = (request: Request) => {
  const url = new URL(request.url);
  return url.pathname.split("/")?.[1];
};
