import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const validateAccessToken = (
    request: NextRequest
) => {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
        return NextResponse.json(
            {
                message: "Authorization header is required",
            },
            {
                status: 401,
            }
        );
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
        return NextResponse.json(
            {
                message: "Invalid authorization format",
            },
            {
                status: 401,
            }
        );
    }

    return null;
};