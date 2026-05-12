"use client"

import {useRouter} from "next/dist/client/components/navigation";
import {useTransition} from "react";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import Image from "next/image";
import Logout from "@/widgets/Logout/Logout";
import ThemeToggle from "@/widgets/ThemeToggle/ThemeToggle";
import DefaultBlock from "@/shared/ui/DefaultBlock";

const NavBar = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return(
        <>
            <div className="flex flex-row justify-between my-6">
                <DefaultBlock>
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
                </DefaultBlock>

                <DefaultBlock>
                    {/*{finalMenuItemsList}*/}
                </DefaultBlock>

                <DefaultBlock>
                    <ThemeToggle />
                    <Logout />
                </DefaultBlock>
            </div>
            {isPending && <LoaderComponent />}
        </>
    );
}

export default NavBar;