"use client"

import {type PropsWithChildren, useEffect} from "react";
import {setupListeners} from "@reduxjs/toolkit/query";
import {persistor, store} from "@/shared/model/store";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";

const ReduxProvider = ({ children }: PropsWithChildren) => {
    useEffect(() => {
        return setupListeners(store.dispatch);
    }, []);

    return(
        <Provider store={store}>
            <PersistGate persistor={persistor}>{children}</PersistGate>
        </Provider>
    );
}

export default ReduxProvider;