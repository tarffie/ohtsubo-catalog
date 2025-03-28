import type { InferSelectModel } from "drizzle-orm";

import pg from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
// our config files
import { config } from "@/lib/utils/config";

import * as schema from "./schema";

const assemblePostgresConnectionString = () => {
  const user = config.POSTGRESDB_USER || "postgres";
  const password = config.POSTGRESDB_ROOT_PASSWORD || "";
  const url = config.POSTGRESDB_URL || "localhost";
  const database = config.POSTGRESDB_DATABASE || "postgres";
  const port = config.POSTGRESDB_LOCAL_PORT || "5433";

  return `postgresql://${user}:${password}@${url}:${port}/${database}`;
};

export const pool = new pg.Pool({
  connectionString: assemblePostgresConnectionString(),
});

export const db = drizzle(pool, {
  schema,
});
