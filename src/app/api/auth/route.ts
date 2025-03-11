import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import {
  generateSessionToken,
  createSession,
} from "@/lib/repository/sessionRepository";
import { getUserByEmail } from "@/lib/repository/userRepository";

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

    const isValidPassword = await bcrypt.compare(
      password.toString(),
      user.password,
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
    const session = createSession(token, id);

    return NextResponse.json({
      success: true,
      credentials,
      status: 200,
    });
  } catch (error) {
    console.error("Error processing form data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process form data",
        status: 400,
      },
      { status: 400 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ body: "hello, GET", status: 200 });
}
