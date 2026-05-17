"use client";

import { useEffect, useTransition } from "react";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import {useRouter} from "next/navigation";
import withAuth from "@/shared/model/HOC/withAuth";


function Page() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            router.replace("/dashboard");
        });
    }, [router]);

    return isPending ? <LoaderComponent /> : null;
}

export default withAuth(Page);
