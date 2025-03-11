import type { User, Session } from "@/lib/types";
import { eq } from "drizzle-orm";
import { UserSchema, SessionSchema } from "../database/schema";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { db } from "@/lib/database/db";

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  userId: string,
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };

  await db.insert(SessionSchema).values(session);
  return session;
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const result = await db
    .select({ user: UserSchema, session: SessionSchema })
    .from(SessionSchema)
    .innerJoin(UserSchema, eq(SessionSchema.userId, UserSchema.id))
    .where(eq(SessionSchema.id, sessionId));

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(SessionSchema).where(eq(SessionSchema.id, session.id));
    return { session: null, user: null };
  }

  /**
   * check if experation is due to 15 days, if so, it refresh the tokens for more
   * 30 days
   */
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await db
      .update(SessionSchema)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(SessionSchema.id, session.id));
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string): Promise<void> {
  await db.delete(SessionSchema).where(eq(SessionSchema.id, sessionId));
}

export async function invalidateAllSessions(userId: number): Promise<void> {
  await db.delete(SessionSchema).where(eq(SessionSchema.userId, userId));
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
