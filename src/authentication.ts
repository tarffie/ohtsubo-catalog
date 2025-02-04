import { authConfig } from "./auth.config";
import bcrypt from "bcrypt";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./lib/repository/userRepository";
import NextAuth from "next-auth";
import type { User } from "./lib/interfaces/User";
import { z } from "zod";


async function getUser(email: string): Promise<User | undefined> {
  try {
    const user: User = await getUserByEmail(email);
    return user.rows[0];
  } catch (e) {
    throw new Error(e);
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log("invalid credentials");
        return null;
      },
    }),
  ],
});
