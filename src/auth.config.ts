import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnCart = nextUrl.pathname.startsWith("/cart");
      if (isOnCart) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/cart", nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
