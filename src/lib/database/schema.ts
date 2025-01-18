import {
  text,
  real,
  pgTable,
  integer,
  bigint,
  timestamp,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const ServiceSchema = pgTable("services", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  title: text("title").default("").notNull(),
  description: text("description").default("").notNull(),
  price: real("price").default(0.0).notNull(),
  availabilityStatus: integer("status").default(0).notNull(),
  minimumOrderQuantity: integer("quantity").default(1).notNull(),
});

export const PurchaseSchema = pgTable("purchases", {
  id: bigint("id", { mode: "bigint" }).primaryKey(),
  userId: bigint("user_id", { mode: "bigint" })
    .notNull()
    .references(() => UserSchema.id),
  price: real("price").default(0.0).notNull(),
  status: integer("status").default(0).notNull(),
  date: timestamp("date").notNull().defaultNow(),
});

export const UserSchema = pgTable("users", {
  id: bigint("id", { mode: "bigint" }).primaryKey().notNull().unique(),
  username: varchar("username").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
});

export const PurchaseServicesSchema = pgTable("purchase_services", {
  id: bigint("id", { mode: "bigint" }).primaryKey().unique().notNull(),
  purchaseId: bigint("purchase_id", { mode: "bigint" })
    .notNull()
    .references(() => PurchaseSchema.id), // Foreign key to purchases
  serviceId: bigint("service_id", { mode: "bigint" })
    .notNull()
    .references(() => ServiceSchema.id), // Foreign key to services
  quantity: integer("quantity").default(1).notNull(), // Optional: track how many of each service were purchased
});
