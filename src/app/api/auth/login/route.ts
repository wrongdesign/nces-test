import { NextResponse } from "next/server";
import type { AuthFormType } from "@/features/auth";
import { elements } from "./mocks";
import { INTERNAL_ERROR } from "@/app/api/config/common";

export async function POST(request: Request) {
  try {
    const body: AuthFormType = await request.json();

    const { email, password } = body;

    const user = elements.find(
      (element) => element.email === email && element.password === password,
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid credentials",
        },
        {
          status: 401,
        },
      );
    }

    return new NextResponse(null, {
      status: 204,
    });
  } catch (error) {
    console.error("[AUTH_LOGIN]", error);

    return INTERNAL_ERROR(error);
  }
}
