"use client"

import {useRouter} from "next/dist/client/components/navigation";
import {useTransition} from "react";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import Image from "next/image";
import Logout from "@/widgets/Logout/Logout";
import ThemeToggle from "@/widgets/ThemeToggle/ThemeToggle";

const NavBar = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return(
        <>
            <div className="flex flex-row justify-between my-6">
                <div className={'bg-popover py-6 px-4 rounded-2xl flex flex-col gap-4 justify-center'}>
                    <Image
                        alt={'Logo'}
                        className="cursor-pointer"
                        height={30}
                        src={'/logo.png'}
                        width={40}
                        onClick={() =>
                            startTransition(() => {
                                router.push('/dashboard');
                            })
                        }
                    />
                </div>

                <div className={'bg-popover py-6 px-4 rounded-2xl flex flex-col justify-center gap-4'}>
                    {/*{finalMenuItemsList}*/}
                </div>


                <div className={'bg-popover py-6 px-4 rounded-2xl flex flex-row justify-center gap-4'}>
                    <ThemeToggle />
                    <Logout />
                </div>
            </div>
            {isPending && <LoaderComponent />}
        </>
    );
}

export default NavBar;