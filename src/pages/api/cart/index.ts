import { NextApiRequest, NextApiResponse } from "next";

import { createPurchase } from "@/lib/repository/purchaseRepository";
import Status from "@/lib/enums/status";
import { getCartById } from "@/lib/repository/cartRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    switch (req.method) {
      case "POST":
        return POST(req, res);
      case "GET":
        return GET(req, res);
      default:
        break;
    }
  } catch (e) {
    console.error(e);
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.body[0];

  const service = {
    id: body.id,
    title: body.title,
    description: body.description,
    price: body.price,
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
    //userId,
  );

  return res.status(200).json({
    success: true,
    purchase: purchase,
    headers: req.headers,
  });
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.cookies;

  const cart = await getCartByUserId(id);

  return res
    .status(200)
    .json({ success: false, cart: cart, headers: req.headers });
}
