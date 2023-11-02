export const PORT: number = Number(process.env.PORT) ?? 3000;

export const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

export const DB_URL: string | undefined = process.env.DATABASE_URL;

export const LOG_ERRORS_TO_CONSOLE: boolean =
  process.env.LOG_ERRORS_TO_CONSOLE === "true" ? true : false;
