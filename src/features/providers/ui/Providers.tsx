"use client"

import {type PropsWithChildren, Suspense} from "react";
import ReduxProvider from "./ReduxProvider";
import LoaderComponent from "@/shared/ui/LoaderComponent";
import {ThemeProvider} from "next-themes";

const Providers = ({ children }: PropsWithChildren) => {
    return(
        <ReduxProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Suspense fallback={<LoaderComponent />}>
                    {children}
                </Suspense>
            </ThemeProvider>
        </ReduxProvider>
    );
}

export default Providers;