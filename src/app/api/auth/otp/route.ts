import {NextResponse} from 'next/server';
import {otp, user} from "./mocks";
import type {OtpBody} from "@/entities/user";

export async function POST(request: Request) {
    try {
        const body: OtpBody =
            await request.json()

        const { pin } = body

        const otpValid = otp.includes(pin);

        await new Promise((resolve) => {
            setTimeout(resolve, 1000)
        })

        if (!otpValid) {
            return NextResponse.json(
                {
                    message: "Invalid OTP",
                },
                {
                    status: 401,
                }
            )
        }

        return NextResponse.json(
            {
                ...user
            },
            {
                status: 200,
            }
        )
    } catch (error) {
        console.error("[AUTH_OTP]", error)

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
}