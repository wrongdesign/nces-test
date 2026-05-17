"use client"

import {useRouter} from "next/navigation";
import {useTransition} from "react";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import Image from "next/image";
import Logout from "@/widgets/Logout/Logout";
import ThemeToggle from "@/widgets/ThemeToggle/ThemeToggle";
import DefaultBlock from "@/shared/ui/DefaultBlock";
import NavMenu from "@/widgets/NavMenu/NavMenu";

const NavBar = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    return(
        <>
            <div className="flex flex-row justify-between my-6">
                <DefaultBlock>
                    <Image
                        alt={'Logo'}
                        loading="eager"
                        className="cursor-pointer"
                        height={30}
                        src={'/logo.webp'}
                        width={40}
                        style={{ height: 'auto', width: 'auto' }}
                        onClick={() =>
                            startTransition(() => {
                                router.push('/dashboard');
                            })
                        }
                    />
                </DefaultBlock>

                <DefaultBlock>
                    <NavMenu />
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