import {useVerify2faMutation} from "@/shared/model/store/api/auth.api";
import {useApiErrorToast} from "@/shared/model/hooks/useApiErrorToast";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {useAppDispatch} from "@/shared/model/store";
import {updateUser} from "@/shared/model/store/slices/auth/auth.slice";

const useOTP = () => {
    const dispatch = useAppDispatch();

    const [sendOtp, {isLoading: sendOtpLoading, error: sendOtpError}] = useVerify2faMutation();

    useApiErrorToast(sendOtpError);

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const onSubmit = async (code: string) => {
        try {
            const response = await sendOtp({ pin: code }).unwrap();

            if (response) {
                dispatch(updateUser(response));

                startTransition(() => {
                    router.push("/dashboard");
                })
            }
        } catch (e) {
            console.error(e);
        }
    }

    return {
        loading: sendOtpLoading || isPending,
        onSubmit
    };
}

export default useOTP;