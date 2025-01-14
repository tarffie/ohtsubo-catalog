import { NextApiRequest, NextApiResponse } from "next";

import { ServiceSchema as ServiceEntity } from "@/lib/entities/Service";
import { createPurchase } from "@/lib/repository/purchaseRepository";
import { Status } from "@/lib/enums/Status";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method == "POST") {
      const body = await req.body;

      const service = {
        id: body.id,
        title: body.title,
        description: body.description,
        price: body.price,
        availabilityStatus: body.availabilityStatus,
        quantity: body.quantity,
      };

      const purchase = {
        price: service.price,
        status: Status.PENDING,
        services: new Array(service),
        date: new Date(),
      };

      createPurchase(purchase);
      return res.status(200).json({ success: true });
    }
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: Request) {}
