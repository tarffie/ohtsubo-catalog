import { db } from "@/lib/database/db";
import { Service } from "@/lib/interfaces/Service";
import { ServiceSchema as services } from "../database/schema";
import { eq } from "drizzle-orm";

export const getServiceById = async (
  id: bigint,
): Promise<Service | undefined> => {
  const service = await db.query.ServiceSchema.findFirst({
    where: (services, { eq }) => eq(services.id, id),
  });

  const parsedService = {
    ...service,
    id: String(service?.id),
  };

  return parsedService;
};

export const getServices = async (): Promise<Array<Service>> => {
  const services = await db.query.ServiceSchema.findMany();

  const parsedServices = services.map((service) => ({
    ...service,
    id: service.id.toString(),
  }));

  return parsedServices;
};

export const createService = async (service: Service) => {
  const data = Object.values(service);
  await db.insert(services).values(data);
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
  db.delete(services).where(eq(services, id));
};
