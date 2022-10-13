import { Logs } from "../types/index.ts";

const readLog = () => {
  return Deno.readTextFileSync("log.json");
};

const writeLog = (toWrite: string) => {
  Deno.writeTextFileSync("log.json", toWrite);
};

export const getLogJSON = (): Logs => {
  return JSON.parse(readLog());
};

export const createLog = (id: string, content: string) => {
  const log = getLogJSON();

  if (!log[id]) {
    log[id] = [];
  }

  log[id].push({
    created: new Date(),
    content,
  });

  writeLog(JSON.stringify(log));
};

export const deleteLogs = (id: string) => {
  const log = getLogJSON();

  if (!log[id]) {
    return;
  }

  log[id] = [];

  writeLog(JSON.stringify(log));
};
