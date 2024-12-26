import { db } from "@/lib/database/db";
import { Service } from "@/lib/interfaces/Service";
import { ServiceSchema as services } from "../database/schema";
//import { eq } from "drizzle-orm";

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

export const createService = async (service: Service) => {
  const data = Object.values(service);
  await db.insert(services).values(data);
};

export const updateService = async (
  service: Service,
): Promise<Service | undefined> => {
  throw new Error("TODO");
};

export const deleteService = async () => {
  throw new Error("TODO");
};
