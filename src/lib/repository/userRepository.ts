import { User } from "@/lib/types";
import { db } from "@/lib/database/db";
import { UserSchema as users } from "../database/schema";
import { getRowCount } from "../utils/dbUtils";
import { eq } from "drizzle-orm";

export const getUsers = async (): Promise<Array<User> | undefined> => {
  const users = await db.query.UserSchema.findMany();
  return users;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  const user = await db.query.UserSchema.findFirst({
    where: (users, { eq }) => eq(users.id, BigInt(id)),
  });

  return user;
};
export const getUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  const user = await db.query.UserSchema.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });

  if (user === undefined) return undefined;
  return user;
};

export const createUser = async (id: string, payload: User) => {
  let user: User | undefined = await getUserById(id);

  const {
    email,
    firstName,
    lastName,
    phoneCountryCode,
    phoneNumber,
    password,
    createdAt,
  } = payload;

  if (user === undefined) {
    user = {
      id: BigInt(await getRowCount(users)),
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneCountryCode: phoneCountryCode,
      phoneNumber: phoneNumber,
      password: password,
      createdAt: createdAt,
      updatedAt: createdAt,
    };
  } else {
    throw new Error("User already exists");
  }

  await db.insert(users).values(user);
};

export const updateUser = async (payload: User) => {
  await db
    .update(users)
    .set({
      email: payload.email,
      password: payload.password,
      updatedAt: new Date(),
    })
    .where(eq(users, payload.id));
};

export const deleteUser = async (id: string) => {
  await db.delete(users).where(eq(users, id));
};
