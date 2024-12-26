import type { NextApiRequest, NextApiResponse } from "next";

import { findServiceById } from "@/lib/repository/ServiceRepository";
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

    const service: Service | null = await findServiceById(id);

    if (!service) {
      res.status(400).json({ error: "Service not found." });
    }

    res.status(200).json(service);
  } catch (e) {
    console.error(`Error in getService: ${e}`);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getServices(req: NextApiRequest, res: NextApiResponse) {
  console.error(`FAIL: TODO`);
}

export async function saveService(req: NextApiRequest, res: NextApiResponse) {
  console.error(`FAIL: TODO`);
}

export async function deleteService(req: NextApiRequest, res: NextApiResponse) {
  console.error(`FAIL: TODO`);
}

export async function updateService(req: NextApiRequest, res: NextApiResponse) {
  console.error(`FAIL: TODO`);
}
