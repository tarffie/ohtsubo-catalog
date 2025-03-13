import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  generateSessionToken,
  createSession,
} from "@/lib/repository/sessionRepository";
import { getUserByEmail } from "@/lib/repository/userRepository";
import { hashPassword } from "@/lib/utils/hashPassword";

/**
 * This method receives formData and authenticate the user with it
 */

export async function POST(request: NextRequest) {
  try {
    // Await the formData() method to get the form data
    const formData = await request.formData();

    // Convert FormData to a plain object for easier handling
    const credentials = Object.fromEntries(formData.entries());
    const { email, password } = credentials;

    // now we check for our user informations
    const user = await getUserByEmail(String(email));

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid Email Or Password`,
          status: 404,
        },
        { status: 404 },
      );
    }

    const hashedPassword = await hashPassword(String(password));

    const isValidPassword = await bcrypt.compare(
      password.toString(),
      hashedPassword,
    );

    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid Email Or Password`,
          status: 404,
        },
        { status: 404 },
      );
    }

    const { id } = user;
    const token = generateSessionToken();
    const session = await createSession(token, id);

    const parsedSession = {
      ...session,
      userId: String(session.userId),
    };

    return NextResponse.json({
      success: true,
      parsedSession,
      status: 200,
    });
  } catch (e) {
    const error = e as Error;
    console.error("Error processing form data:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Failed with error: ${error.message}`,
        status: 400,
      },
      { status: 400 },
    );
  }
}

export async function GET() {
  const hello = "hello, world";
  return NextResponse.json({ hello, status: 200 }, { status: 200 });
}
