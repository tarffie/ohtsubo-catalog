import { text, real, pgTable, integer, bigint } from "drizzle-orm/pg-core";

export const ServiceSchema = pgTable("services", {
  id: bigint("id", {mode: "bigint"}).primaryKey(),
  title: text("title").default("").notNull(),
  description: text("description").default("").notNull(),
  price: real("price").default(0.0).notNull(),
  availabilityStatus: integer("status").default(0).notNull(),
  minimumOrderQuantity: integer("quantity").default(1).notNull(),
});
