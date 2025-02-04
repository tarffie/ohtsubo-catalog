import { NextApiRequest, NextApiResponse } from "next";

import { cookies } from "next/headers";

import { createPurchase } from "@/lib/repository/purchaseRepository";
import Status from "@/lib/enums/status";
import { getCartById, getCartByUserId } from "@/lib/repository/cartRepository";

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
  let cart;

  if (id !== undefined) {
    cart = await getCartByUserId(BigInt(String(id)));
    const parsedCart = {
      ...cart,
      id: String(cart.id),
      userId: String(cart.userId),
    };

    return res
      .status(200)
      .json({ success: true, cart: parsedCart, headers: req.headers });
  }

  const e = new Error("cart not found");
  return res.status(404).json({
    success: false,
    cart: { message: e.message },
    headers: req.headers,
  });
}
