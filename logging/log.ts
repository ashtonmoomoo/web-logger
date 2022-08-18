interface Entry {
  created: Date;
  content: string;
}

interface Logs {
  [id: string]: Entry[];
}

const readLog = () => {
  return Deno.readTextFileSync("log.json");
};

const writeLog = (toWrite: string) => {
  Deno.writeTextFileSync("log.json", toWrite);
};

export const createLog = (id: string, content: string) => {
  const log: Logs = JSON.parse(readLog());

  if (!log[id]) {
    log[id] = [];
  }

  log[id].push({
    created: new Date(),
    content,
  });

  writeLog(JSON.stringify(log));
};
