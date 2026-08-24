function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}. See .env.example.`);
  }
  return value;
}

export const isCI = !!process.env.CI;

export const uiConfig = {
  baseURL: process.env.UI_BASE_URL ?? `https://demoqa.com`,
};

export const apiConfig = {
  baseURL: process.env.API_BASE_URL ?? `https://reqres.in`,
  get apiKey(): string {
    return requireEnv(`REQRES_API_KEY`);
  },
};

export const demoUser = {
  get username(): string {
    return `${requireEnv(`DEMO_USER`)}_w${process.env.TEST_PARALLEL_INDEX ?? `0`}`;
  },
  get password(): string {
    return requireEnv(`DEMO_PASSWORD`);
  },
};

export const dbConfig = {
  host: process.env.DB_HOST ?? `localhost`,
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER ?? `postgres`,
  password: process.env.DB_PASSWORD ?? `postgres`,
  database: process.env.DB_NAME ?? `postgres`,
};
