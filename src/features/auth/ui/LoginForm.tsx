"use client"

import {useForm} from "react-hook-form";
import {type AuthFormType, authSchema} from "@/features/auth";
import {zodResolver} from "@hookform/resolvers/zod";
import DefaultFormWrapper from "@/widgets/DefaultFormWrapper/DefaultFormWrapper";
import FormField from "@/shared/ui/FormField";
import useLogin from "@/features/auth/api/hooks/useLogin";

const LoginForm = () => {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AuthFormType>({
        resolver: zodResolver(authSchema),
    });

    const { loading, onSubmit } = useLogin();

    return(
        <DefaultFormWrapper
            mainWrapperStyles={"flex flex-col gap-2!"}
            buttonText={'Login'}
            buttonDisabled={loading}
            buttonSubmit={handleSubmit(onSubmit)}>
            <FormField
                control={control}
                label="Email"
                name="email"
                errors={errors}
                inputProps={{
                    autoComplete: 'email',
                    placeholder: 'Type: email@email.com',
                }}
            />

            <FormField
                control={control}
                label="Password"
                name="password"
                errors={errors}
                type={"password"}
                inputProps={{
                    placeholder: 'Type: 12345678',
                }}
            />
        </DefaultFormWrapper>
    );
}

export default LoginForm;