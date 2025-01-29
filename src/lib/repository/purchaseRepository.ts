import { db } from "@/lib/database/db";
import { getRowCount } from "@/lib/utils/dbUtils";
import { Purchase } from "@/lib/interfaces/Purchase";
import { Service } from "@/lib/interfaces/Service";
import {
  PurchaseSchema as purchases,
  PurchaseItemsSchema,
} from "../database/schema";


import { eq } from "drizzle-orm/expressions";

export const getPurchaseById = async (
  id: bigint,
): Promise<Purchase | undefined> => {
  return undefined;
};

export const getPurchases = async (): Promise<Array<Purchase> | undefined> => {
  return undefined;
};

export const createPurchase = async (
  price: number,
  status: number,
  services: Service[],
  userId: bigint,
) => {
  const currentDate = new Date();
  const id = BigInt(await getRowCount(purchases));

  let purchase = {
    id,
    userId,
    price,
    status,
    date: currentDate,
  };

  await db.insert(purchases).values(purchase);

  const purchaseId = id;

  const purchaseServices = services.map((service) => ({
    id,
    purchaseId,
    serviceId: BigInt(service.id),
  }));

  await db.insert(PurchaseItemsSchema).values(purchaseServices);
};

export const updatePurchase = async (purchase: Purchase) => {
  let { price, status, services, date } = purchase;

  let id = BigInt(String(purchase.id));
  let userId = BigInt(String(purchase.userId));

  let updatedPurchase = {
    id,
    userId,
    price,
    status,
    date,
    services,
  };

  await db
    .update(purchases)
    .set(updatedPurchase)
    .where(eq(purchases, purchase.id));
};

export const deletePurchase = async (id: string) => {
  db.delete(purchases).where(eq(purchases, id));
};

export const getPurchaseRowCount = async (): Promise<number> => {
  const rows = await db.query.PurchaseSchema.findMany();
  return Object.keys(rows).length;
};
