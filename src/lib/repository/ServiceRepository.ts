import { db } from "@/lib/database/db";
import { Service } from "@/lib/interfaces/Service";
import { ServiceSchema as services } from "../database/schema";
import { eq } from "drizzle-orm";

// GET
export const getServiceById = async (
  id: bigint,
): Promise<Service | undefined> => {
  const service = await db.query.ServiceSchema.findFirst({
    where: (services, { eq }) => eq(services.id, id),
  });

  return service;
};

// GET
export const getServices = async (): Promise<Array<Service> | undefined> => {
  const services = await db.query.ServiceSchema.findMany();
  return services;
};

// POST
export const createService = async (service: Service) => {
  const data = Object.values(service);
  await db.insert(services).values(data);
};

// PUT
export const setService = async (service: Service) => {
  await db
    .update(services)
    .set({
      title: service.title,
      description: service.description,
      price: service.price,
      availabilityStatus: service.availabilityStatus,
      minimumOrderQuantity: service.minimumOrderQuantity,
    })
    .where(eq(services, service.id));
};

// DELETE
export const deleteService = async (service: Service) => {
  db.delete(services).where(eq(services, service.id));
};
