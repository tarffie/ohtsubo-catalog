import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/lib/repository/userRepository";
import { User } from "@/lib/types";
import { UserSchema as user } from "@/lib/entities/User";
import { hashPassword } from "@/lib/utils/hashPassword";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    if (!formData) {
      throw new Error("No form data provided");
    }

    // Extract form data
    const {
      firstName,
      lastName,
      email,
      password,
      phoneCountryCode,
      phoneNumber,
    } = Object.fromEntries(formData);

    // Hash the password
    const hashedPassword = await hashPassword(String(password));

    // Create new user objectn
    const newUser = user.parse({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneCountryCode,
      phoneNumber,
      currentDate: Date.now(),
      Date,
    });

    // Attempt to create the user
    const result = await createUser(String(email), newUser as User);
    if (!result) {
      throw new Error("User already exists");
    }

    // Prepare the response
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

    // Log the error for debugging
    console.error("Error in POST request:", error.message);

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
