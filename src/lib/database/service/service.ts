import type { NextApiRequest, NextApiResponse } from "next";

import {
  getServiceById as findServiceById,
  getServices as findServices,
  createService,
  setService ,
} from "@/lib/repository/serviceRepository";
import { Service } from "@/lib/interfaces/Service";

/**
 * the controller for all product related CRUD operations
 * not oop oriented
 */

export async function getService(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;

    if (!id) {
      res.status(400).json({ error: "Invalid request: 'id' is required." });
    }

    const service: Service | undefined = await findServiceById(id);

    if (!service) {
      res.status(400).json({ error: "Service not found." });
    }

    res.status(200).json(service);
  } catch (e) {
    console.error(`Error in getService: ${e}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getServices(res: NextApiResponse) {
  try {
    const services: Array<Service> | undefined = await findServices();

    if (!services) {
      res.status(400).json({ error: "There are no services" });
    }

    res.status(200).json(services);
  } catch (e) {
    throw new Error(`Services fetch failed with error: ${e}`);
  }
}

export async function saveService(req: NextApiRequest, res: NextApiResponse) {
  const { service } = req.body;

  if (!service) {
    res.status(500).json({ error: "something failed saving service" });
  }

  createService(service);
  res.status(200).json(service);
}

export async function updateService(req: NextApiRequest, res: NextApiResponse) {
}
export async function deleteService(req: NextApiRequest, res: NextApiResponse) {
  throw new Error(`FAIL: TODO`);
}
