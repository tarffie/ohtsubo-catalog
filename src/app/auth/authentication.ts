"use server";

import { z } from "zod";
/*import { createSession, deleteSession } from "@/app/lib/auth/session";*/
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export const login = async (prevState: unknown, formData: FormData) => {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const { email, password } = result.data;
  console.log(email, password);

  return;
  // check if email exists
  /*
  if (!(user.email)) {
    return {
      errors: {
        email: ["Invalid email or password"],
      },
    };
  }
   */
  // create session for mockup user
  //await createSession(user.id);
  redirect("/dashboard");
};
