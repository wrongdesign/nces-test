"use client"

import {type PropsWithChildren, Suspense} from "react";
import ReduxProvider from "./ReduxProvider";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import {ThemeProvider} from "next-themes";
import {Toaster} from "@/shared/ui/sonner";

const Providers = ({ children }: PropsWithChildren) => {
    return(
        <ReduxProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                forcedTheme="system"
            >
                <Suspense fallback={<LoaderComponent />}>
                    {children}
                </Suspense>
                <Toaster />
            </ThemeProvider>
        </ReduxProvider>
    );
}

export default Providers;