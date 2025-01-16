import { NextApiRequest, NextApiResponse } from "next";

import { createPurchase } from "@/lib/repository/purchaseRepository";
import { Status } from "@/lib/enums/Status";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method == "POST") {
      const body = await req.body[0];

      const service = {
        id: body.id,
        title: body.title,
        description: body.description,
        price: body.price,
        availabilityStatus: body.availabilityStatus,
        quantity: body.quantity,
      };

      const services = new Array(service);
      const timeNow = new Date();

      const purchase = {
        price: service.price,
        status: Status.PENDING,
        services: services,
        date: timeNow,
      };

      createPurchase(
        purchase.price,
        purchase.status,
        purchase.services,
        BigInt(0),
      );

      return res.status(200).json({
        success: true,
        purchase: purchase,
        headers: req.headers,
      });
    }
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: Request) {}
