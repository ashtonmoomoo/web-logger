export const requireEnvVar = (name: string) => {
  const variable = process.env[name];

  if (!variable) {
    throw new Error(
      `Environment variable ${name} not found, but was required.`
    );
  }

  return variable;
};

export const getEnvVar = (name: string, fallback?: string) => {
  return process.env[name] || fallback;
};
