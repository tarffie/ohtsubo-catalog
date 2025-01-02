import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";


config({ path: ".env" });

const assemblePostgresConnectionString = () => {
  const user = process.env.POSTGRESDB_USER || "postgres";
  const password = process.env.POSTGRESDB_ROOT_PASSWORD || "";
  const url = process.env.POSTGRESDB_URL || "127.0.0.3";
  const database = process.env.POSTGRESDB_DATABASE || "postgres";
  const port = process.env.POSTGRESDB_LOCAL_PORT || "5432";


  return `postgresql://${user}:${password}@${url}:${port}/${database}`;
};

export default defineConfig({
  schema: "./src/lib/database/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: assemblePostgresConnectionString(),
  },
});
