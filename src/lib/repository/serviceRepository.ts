import { db } from "@/lib/database/db";
import { Service } from "@/lib/types";
import { ServiceSchema as services } from "../database/schema";
import { eq } from "drizzle-orm";

export const getServiceById = async (
  id: bigint,
): Promise<Service | undefined> => {
  const service = await db.query.ServiceSchema.findFirst({
    where: (services, { eq }) => eq(services.id, id),
  });

  if (service) {
    return service;
  }

  throw new Error("coudn't find service");
};

export const getServices = async (): Promise<Array<Service>> => {
  const services = await db.query.ServiceSchema.findMany();

  if (services) {
    return services;
  }

  throw new Error("Couldn't find any services");
};

export const createService = async (service: Service) => {
  await db.insert(services).values(service);
};

export const updateService = async (service: Service) => {
  await db
    .update(services)
    .set({
      title: service.title,
      description: service.description,
      price: service.price,
    })
    .where(eq(services, service.id));
};

export const deleteService = async (id: string) => {
  await db.delete(services).where(eq(services, id));
};
