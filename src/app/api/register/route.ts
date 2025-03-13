import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/repository/userRepository";
import { User } from "@/lib/types";
import { UserSchema as user } from "@/lib/entities/User";
import { hashPassword } from "@/lib/utils/hashPassword";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    if (formData) {
      try {
        let {
          firstName,
          lastName,
          email,
          password,
          phoneCountryCode,
          phoneNumber,
        } = Object.fromEntries(formData);

        const cachePassword = password;
        password = await hashPassword(String(cachePassword));
        const currentDate = Date.now();

        const newUser = user.parse({
          firstName,
          lastName,
          email,
          password,
          phoneCountryCode,
          phoneNumber,
          currentDate,
          Date,
        });

        let result = await createUser(String(email), newUser as User);

        if (!result) {
          throw new Error("user already exists");
        }

        const parsedResult = {
          ...result,
          id: String(result.id),
        };

        return NextResponse.json(
          { success: true, parsedResult, status: 200 },
          { status: 200 },
        );
      } catch (e) {
        const error = e as Error;
        throw new Error(error.message);
      }
    }
  } catch (e) {
    const error = e as Error;
    return NextResponse.json(
      {
        success: false,
        error: `BAD REQUEST: failed with error '${error.message}'`,
        status: 400,
      },
      { status: 400 },
    );
  }
}
