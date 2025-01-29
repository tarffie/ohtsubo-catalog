import { Cart } from "@/lib/interfaces/Cart";
import { db } from "@/lib/database/db";
import { CartSchema as carts, CartSchema } from "../database/schema";
import { getRowCount } from "../utils/dbUtils";
import { eq } from "drizzle-orm";

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

export const getCartByUserId = async (id: bigint): Promise<Cart> => {
  let cart = await db.query.CartSchema.findFirst({
    where: (carts, { eq }) => eq(carts.userId, id),
  });

  if (!(cart !== undefined)) {
    cart = {
      id: BigInt(await getRowCount(CartSchema)),
      userId: BigInt(-1),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  // return all mighty cart!
  return cart;
};

export const createCart = async (id: bigint, payload: Cart) => {
  let cart: Cart | undefined = await getCartById(id);

  const { userId, createdAt } = payload;

  if (cart?.userId === BigInt(-1)) {
    cart = {
      ...cart,
      id: id,
      userId: userId,
    };
  } else {
    throw new Error("Cart already exists");
  }

  const data = Object.values(cart);

  // save to database cart state
  await db.insert(carts).values(data);
};
