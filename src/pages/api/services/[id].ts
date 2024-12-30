import { NextApiRequest, NextApiResponse } from "next";
import {
  getServiceById,
  updateService,
  deleteService,
} from "@/lib/repository/serviceRepository";
import { Service } from "@/lib/interfaces/Service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query;
  const method = req.method;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Service not found" });
  }

  try {
    switch (method) {
      case "GET":
        const service = await getServiceById(id.toString());

        if (service === undefined) {
          return res
            .status(404)
            .json([{ error: "Service not found" }, `id: ${id}`, service]);
        }

        // json cannot handle bigint from id field
        const parsableService: Service = {
          ...service,
          id: id.toString(),
        };

        res.status(200).json(parsableService);
      case "PUT":
        const updatedData = req.body;
        const updatedService = await updateService(updatedData);

        return res.status(200).json(updatedService);
      case "DELETE":
        await deleteService(id!.toString());
        return res.status(204).end();
      default:
        res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    const error = e as Error;
    res.status(500).json([
      `id: ${id}`,
      method,
      {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      },
    ]);
  }
}
