import { z } from "zod";
import path from "node:path";
import dotenv from "dotenv";
import { formatZodError } from "./utils/formatZodError";
import chalk from "chalk";
const envSchema = z.object({
  DB_URL: z.string().length(2),
  PORT: z.coerce.number(),
});

const rootDir = path.resolve(process.cwd());

if (!process.env.NODE_ENV) {
  console.log(chalk.red("NODE_ENV is not set"));
  process.exit(-1);
}

const envFileName =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";

dotenv.config({
  path: path.resolve(rootDir, envFileName),
});

const envData = envSchema.safeParse(process.env);

if (!envData.success) {
  console.error(chalk.gray("MISSING VARIABLE"));
  console.error(chalk.red(formatZodError(envData.error)));
  process.exit(-1);
}

export default envData.data;
