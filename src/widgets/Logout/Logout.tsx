"use client"

import {Button} from "@/shared/ui/button";
import ConfirmModal from "@/widgets/ConfirmModal/ConfirmModal";
import {useState} from "react";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import {LogOut} from "lucide-react";
import useLogout from "@/shared/model/hooks/useLogout";

const Logout = () => {
    const [confirmModal, setConfirmModal] = useState<boolean>(false);

    const { isPending, logout } = useLogout();

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
            </Button>
            {isPending && <LoaderComponent />}
        </>
    );
}

export default Logout;