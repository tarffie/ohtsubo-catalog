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
  id: string,
): Promise<Purchase | undefined> => {
  const purchase = await db.query.PurchaseSchema.findFirst({
    where: (purchases, { eq }) => eq(purchases.id, BigInt(id)),
  });

  if (!purchase) return undefined;

  const services = await db.query.PurchaseItemsSchema.findMany({
    where: (items, { eq }) => eq(items.purchaseId, purchase.id), // Use purchase.id directly
  });

  const fixedPurchase: Purchase = {
    ...purchase,
    createdAt: purchase.createdAt,
    services: services,
  };

  return fixedPurchase ?? undefined;
};

export const findUserPurchases = async (
  userId: string,
): Promise<Array<Purchase>> => {
  const purchases = await db.query.PurchaseSchema.findMany({
    where: (purchases, { eq }) => eq(purchases.userId, BigInt(userId)),
  });

  const purchaseIds = purchases.map((purchase) => purchase.id);

  const services = await db.query.PurchaseItemsSchema.findMany({
    where: (items, { inArray }) => inArray(items.purchaseId, purchaseIds),
  });

  return (
    purchases.map((purchase) => ({
      ...purchase,
      date: purchase.createdAt, // Add the required date field
      services: services.filter(
        (service) => service.purchaseId === purchase.id,
      ),
    })) ?? undefined
  );
};

export const getPurchases = async (
  userId: string,
): Promise<Array<Purchase> | undefined> => {
  const purchases = await db.query.PurchaseSchema.findMany({
    where: (purchases, { eq }) => eq(purchases.userId, BigInt(userId)),
  });

  const purchaseIds = purchases.map((purchase) => purchase.id);

  const services = await db.query.PurchaseItemsSchema.findMany({
    where: (items, { inArray }) => inArray(items.purchaseId, purchaseIds),
  });

  return (
    purchases.map((purchase) => ({
      ...purchase,
      date: purchase.createdAt, // Add the required date field
      services: services.filter(
        (service) => service.purchaseId === purchase.id,
      ),
    })) ?? undefined
  );
};

export const createPurchase = async (
  price: number,
  status: number,
  services: Service[],
  userId: bigint,
) => {
  const currentDate = new Date();
  const id = BigInt(await getRowCount(purchases));

  const purchase = {
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
  const { price, status, services, createdAt } = purchase;

  const id = BigInt(String(purchase.id));
  const userId = BigInt(String(purchase.userId));

  const updatedPurchase = {
    id,
    userId,
    price,
    status,
    createdAt,
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
