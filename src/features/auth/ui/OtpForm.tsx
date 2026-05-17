"use client"

import {Field, FieldLabel} from "@/shared/ui/field";
import {InputOTP, InputOTPGroup, InputOTPSlot} from "@/shared/ui/input-otp";
import {REGEXP_ONLY_DIGITS} from "input-otp";
import {useState} from "react";
import DefaultFormWrapper from "@/shared/ui/DefaultFormWrapper";
import useOTP from "@/features/auth/api/hooks/useOTP";

const OtpForm = () => {
    const [code, setCode] = useState<string>("");

    const {loading, onSubmit} = useOTP();

    return(
        <DefaultFormWrapper
            mainWrapperStyles={"flex flex-col gap-2!"}
            buttonText={'Send'}
            buttonDisabled={code.length !== 6 || loading}
            buttonSubmit={() => onSubmit(code).catch(console.error)}>
            <Field className="w-fit">
                <FieldLabel htmlFor="otp-block">Enter OTP</FieldLabel>
                <InputOTP autoFocus={true} id="otp-block" maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={code} onChange={(value) => setCode(value)}>
                    <InputOTPGroup >
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </Field>
        </DefaultFormWrapper>

    );
}

export default OtpForm;