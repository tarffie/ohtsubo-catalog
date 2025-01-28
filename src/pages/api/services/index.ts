import { NextApiRequest, NextApiResponse } from "next";
import { getServices, createService } from "@/lib/repository/serviceRepository";
import { Service } from "@/lib/interfaces/Service";
import { ServiceSchema } from "@/lib/entities/Service";
import { mapToService } from "@/lib/utils/map";

// /api/services/
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method == "GET") {
      const services = await getServices();
      res.status(200).json(services);
    } else if (req.method == "POST") {
      const serviceInput = ServiceSchema.parse(req.body);

      const service: Service = mapToService({
        id: serviceInput.id || "",
        title: serviceInput.title,
        description: serviceInput.description || "",
        price: serviceInput.price,
      });

      await createService(service);
      res.status(201).json(service);
    }
  } catch (e) {
    const error = e as Error;
    res.status(500).json({ error: `${error.name}: ${error.message}` });
  }
}
