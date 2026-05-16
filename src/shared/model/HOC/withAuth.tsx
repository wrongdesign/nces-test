"use client";

import {
    type ComponentType,
    useCallback,
    useEffect,
    useRef,
} from "react";

import { toast } from "sonner";
import { usePathname } from "next/navigation";

import { useAppSelector } from "@/shared/model/store";

import {
    eventBus,
    type EventPayload,
} from "@/shared/model/store/event/eventBus";

import LoaderComponent from "@/shared/ui/LoaderComponent";

import useLogout from "@/shared/model/hooks/useLogout";

const withAuth = <P extends object>(
    WrappedComponent: ComponentType<P>
) => {
    const WithAuth = (props: P) => {
        const token = useAppSelector(
            (state) => state.auth.access_token
        );

        const pathname = usePathname();

        const { isPending, logout } = useLogout();

        const isLoggingOutRef = useRef(false);

        const userLogout = useCallback(() => {
            if (isLoggingOutRef.current) return;

            isLoggingOutRef.current = true;

            toast.error(
                "You are not signed in. Please sign in",
                {
                    id: "not-signed-in",
                    position: "bottom-center",
                    duration: 5000,
                }
            );

            logout();
        }, [logout]);

        useEffect(() => {
            const unsubscribe = eventBus.subscribe(
                (event: EventPayload) => {
                    if (event.type === "AUTH_ERROR") {
                        userLogout();
                    }
                }
            );

            return unsubscribe;
        }, [userLogout]);

        useEffect(() => {
            if (!token && pathname !== "/") {
                userLogout();
            }
        }, [token, pathname, userLogout]);

        if (!token || isPending) {
            return <LoaderComponent />;
        }

        return <WrappedComponent {...props} />;
    };

    WithAuth.displayName = `withAuth(${
        WrappedComponent.displayName ||
        WrappedComponent.name ||
        "Component"
    })`;

    return WithAuth;
};

export default withAuth;