import {NextResponse} from "next/server";

export const INTERNAL_ERROR = (error: unknown) => {
    return NextResponse.json(
        {
            message:
                (error as Error).message ??
                "Internal Error",
        },
        {
            status: 500,
        }
    )
}