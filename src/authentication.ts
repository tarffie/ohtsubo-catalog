import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./lib/repository/userRepository";
import NextAuth from "next-auth";
import type { User } from "./lib/interfaces/User";
import { z } from "zod";

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await getUserByEmail(email);
    return user ?? null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsedCredentials = z
            .object({ email: z.string().email(), password: z.string().min(8) })
            .safeParse(credentials);

          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await getUser(email);

            if (!user) return null;

            if (user && (await bcrypt.compare(password, user.password))) {
              const parsedUser = {
                ...user,
                id: String(user.id),
              };
              return parsedUser;
            }
          }
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
});
