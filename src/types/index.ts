export interface Handler {
  (request: Request): Promise<Response> | Response;
}

export interface Entry {
  created: Date;
  content: string;
}

export interface Logs {
  [id: string]: Entry[];
}
