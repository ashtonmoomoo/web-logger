export interface Handler {
  (request: Request): Promise<Response> | Response;
}
