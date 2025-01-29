import { db } from "@/lib/database/db";

import { PgTable } from "drizzle-orm/pg-core";

export const getRowCount = async <T extends PgTable>(
  schema: T,
): Promise<number> => {
  const rows = await db.select().from(schema);
  return rows.length;
};
