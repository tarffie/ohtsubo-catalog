import "server-only";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

import { SignJWT } from "jose";

const secretKey = process.env.AUTH_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (e) {
    const error = e as Error;
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 365.25 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });
  return session;
}

export async function deleteSession() {}

type SessionPayload = {
  userId: string;
  expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("365d")
    .sign(encodedKey);
}

export async function decrypt() {}
