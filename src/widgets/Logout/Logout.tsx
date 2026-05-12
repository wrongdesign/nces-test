"use client"

import {Button} from "@/shared/ui/button";
import ConfirmModal from "@/widgets/ConfirmModal/ConfirmModal";
import {clearUser} from "@/shared/model/store/slices/auth/auth.slice";
import {useState, useTransition} from "react";
import {useRouter} from "next/dist/client/components/navigation";
import {useAppDispatch} from "@/shared/model/store";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import {LogOut} from "lucide-react";

const Logout = () => {
    const dispatch = useAppDispatch();

    const [confirmModal, setConfirmModal] = useState<boolean>(false);

    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const logout = () => {
        dispatch(clearUser());

        startTransition(() => {
            router.replace('/');
        });
    };

    return (
        <>
            <ConfirmModal
                confirmButtonText={'Continue'}
                description={'Are you sure for logout?'}
                isOpen={confirmModal}
                title={'Logout?'}
                onClose={() => setConfirmModal(false)}
                onConfirm={logout}
            />

            <Button
                variant="secondary"
                className="flex flex-row py-3 rounded-[0.625rem] items-center cursor-pointer justify-center gap-2 group hover:text-(--defaultRedColor) hover:stroke-(--defaultRedColor)"
                onClick={() => setConfirmModal(true)}
            >
                <LogOut
                    className="group-hover:text-(--defaultRedColor) group-hover:stroke-(--defaultRedColor) size-5"
                />
                <p className="text-sm leading-none font-medium  group-hover:text-(--defaultRedColor)">
                    Logout
                </p>
            </Button>
            {isPending && <LoaderComponent />}
        </>
    );
}

export default Logout;