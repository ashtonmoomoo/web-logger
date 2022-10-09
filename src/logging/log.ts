import { readFileSync, writeFileSync } from "fs";

export interface Entry {
  created: Date;
  content: string;
}

interface Logs {
  [id: string]: Entry[];
}

const readLog = () => {
  return readFileSync("log.json", "utf-8");
};

const writeLog = (toWrite: string) => {
  writeFileSync("log.json", toWrite);
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
