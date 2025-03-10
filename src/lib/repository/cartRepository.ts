import { Cart } from "@/lib/types";
import { db } from "@/lib/database/db";
import { CartSchema as carts, CartSchema } from "../database/schema";

export const getCarts = async () => {
  const carts = await db.query.CartSchema.findMany();
  return carts;
};

export const getCartById = async (id: bigint): Promise<Cart | undefined> => {
  const cart = await db.query.CartSchema.findFirst({
    where: (carts, { eq }) => eq(carts.id, id),
  });

  return cart;
};

export const getCartByUserId = async (id: bigint) => {
  let cart = await db.query.CartSchema.findFirst({
    where: (carts, { eq }) => eq(carts.userId, id),
  });

  if (cart) {
    return cart;
  }

  throw new Error("This User doesn't have any Carts");
};

export const createCart = async (id: bigint, payload: Cart) => {
  try {
    let cart: Cart | undefined = await getCartById(id);
    const { userId, createdAt } = payload;

    if (cart === undefined) {
      cart = {
        id: id,
        userId: userId,
        createdAt: createdAt,
        updatedAt: createdAt,
      };
    }

    // save to database cart state
    await db.insert(carts).values(cart);
  } catch (e) {
    const error = e as Error;
    throw new Error(`Cart creation failed with: "${error.message}"`);
  }
};
