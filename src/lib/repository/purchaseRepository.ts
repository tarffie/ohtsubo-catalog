import { db } from "@/lib/database/db";
import { Purchase } from "@/lib/interfaces/Purchase";
import { PurchaseSchema as purchases } from "../database/schema";

export const getPurchaseById = async (
  id: bigint,
): Promise<Purchase | undefined> => {
  return undefined;
};

export const getPurchases = async (): Promise<Array<Purchase> | undefined> => {
  return undefined;
};

export const createPurchase = async (purchase: Purchase) => {
  const data = Object.values(purchase);
  await db.insert(purchases).values(data);
};

export const updatePurchase = async (purchase: Purchase) => {
  await db
    .update(purchases)
    .set({
      price: purchase.price,
      status: purchase.status,
      services: purchase.services,
    })
    .where(eq(purchases, purchase.id));
};

export const deletePurchase = async (id: string) => {
  db.delete(purchases).where(eq(purchases, id));
};
