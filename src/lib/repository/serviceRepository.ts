import { db } from "@/lib/database/db";
import { Service } from "@/lib/interfaces/Service";
import { ServiceSchema as services } from "../database/schema";
import { eq } from "drizzle-orm/expressions";

// GET
export const getServiceById = async (
  id: string | number,
): Promise<Service | undefined> => {
  try {
    const service = await db.query.ServiceSchema.findFirst({
      where: (services, { eq }) => eq(services.id, BigInt(id)),
    });

    if (!service) {
      return undefined;
    }

    return service;
  } catch (e) {
    throw new Error(`application failed fetching service.\n Error Stack: ${e}`);
  }
};

// GET
export const getServices = async (): Promise<Array<Service>> => {
  try {
    const services = await db.query.ServiceSchema.findMany();
    return services || [];
  } catch (e) {
    console.error(`application failed fetching services.\nError Stack: ${e}`);
    return [];
  }
};

// POST
export const createService = async (service: Service): Promise<Service> => {
  const [insertedService] = await db
    .insert(services) // Specify the schema/table
    .values({
      id: BigInt(service.id), // Map fields explicitly
      title: service.title,
      description: service.description,
      price: service.price,
      availabilityStatus: service.availabilityStatus ? 1 : 0, // Convert boolean to integer if needed
      minimumOrderQuantity: service.minimumOrderQuantity,
    })
    .returning(); // Return the inserted record(s)

  return insertedService; // Return the first (or only) inserted record
};

// PUT
export const updateService = async (service: Service) => {
  throw new Error(`error trying to parse ${service}\n Error: TODO`);
};

// DELETE
export const deleteService = async (id: string | number | bigint) => {
  try {
    const service = await db.query.ServiceSchema.findFirst({
      where: (services, { eq }) => eq(services.id, BigInt(id)),
    });
    if (service) {
      db.delete(services).where(eq(services.id, BigInt(id)));
    }
  } catch (e) {
    console.error(
      `there was an error deleting service with id ${id}, aborting..`,
    );
    const error = e as Error;
    throw new Error(`${error.name}! failed with message: ${error.message}`);
  }
};
