import { InferSelectModel } from "drizzle-orm";
import {
  UserSchema,
  SessionSchema,
  CartSchema,
  ServiceSchema,
  PurchaseSchema,
} from "@/lib/database/schema";

export type Cart = InferSelectModel<typeof CartSchema>;
export type Purchase = InferSelectModel<typeof PurchaseSchema>;
export type Service = InferSelectModel<typeof ServiceSchema>;
export type User = InferSelectModel<typeof UserSchema>;
export type Session = InferSelectModel<typeof SessionSchema>;
