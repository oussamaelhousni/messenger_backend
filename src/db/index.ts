import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import envData from "../env";
//import relations from "./relations";

const pool = new Pool({
  connectionString: envData.DB_URL,
});

const db = drizzle({
  client: pool,
});

export default db;
