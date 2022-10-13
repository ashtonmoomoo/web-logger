export const MAX_CONTENT_LENGTH =
  Number(Deno.env.get("MAX_CONTENT_LENGTH")) || 2500;
export const PORT = Number(Deno.env.get("PORT")) || 3000;
