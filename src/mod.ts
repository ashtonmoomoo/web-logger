import { serve } from "https://deno.land/std@0.152.0/http/server.ts";
import { PORT } from "../config.ts";
import { handler } from "./handlers/handler.ts";

await serve(handler, { port: PORT });
