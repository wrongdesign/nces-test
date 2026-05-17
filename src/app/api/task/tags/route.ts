import { type NextRequest, NextResponse } from "next/server";
import { INTERNAL_ERROR } from "@/app/api/config/common";
import { readFile } from "@/app/api/task/utils/common";
import type { Tag } from "@/entities/task";
import { validateAccessToken } from "@/app/api/task/utils/auth";

export async function GET(request: NextRequest) {
  try {
    const authError = validateAccessToken(request);

    if (authError) {
      return authError;
    }

    const mockTags: Tag[] = readFile("src/app/api/task/mocks/tags.json");

    return NextResponse.json(mockTags);
  } catch (error) {
    console.error("[GET_TAGS]", error);

    return INTERNAL_ERROR(error);
  }
}
