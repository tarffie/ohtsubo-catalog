// Drizzle & neondatabase for database connection with postgres
import { Pool } from 'drizzle-orm/neon-serverless/'
import { drizzle } from "drizzle-orm/neon-serverless";

// our config files
import { config } from "@/lib/utils/config";

const pool = new Pool({ connectionString: config.POSTGRESDB_URL });

export const db = drizzle(pool);
