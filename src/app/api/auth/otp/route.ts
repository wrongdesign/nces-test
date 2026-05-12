import {NextResponse} from 'next/server';
import {otp, user} from "./mocks";
import type {OtpBody} from "@/entities/user";
import {INTERNAL_ERROR} from "@/app/api/config/common";

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

        return INTERNAL_ERROR(error);
    }
}