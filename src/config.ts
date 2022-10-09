import { getEnvVar } from "./utils/environment";

export const MAX_CONTENT_LENGTH = Number(
  getEnvVar("MAX_CONTENT_LENGTH", "2500")
);
export const PORT = Number(getEnvVar("PORT", "3000"));
