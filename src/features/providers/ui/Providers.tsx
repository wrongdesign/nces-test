"use client"

import {type PropsWithChildren, Suspense} from "react";
import ReduxProvider from "./ReduxProvider";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import {ThemeProvider, useTheme} from "next-themes";
import {Toaster} from "@/shared/ui/sonner";

const Providers = ({ children }: PropsWithChildren) => {
    const { theme } = useTheme();
    return(
        <ReduxProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme={"dark"}
                forcedTheme={theme}
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