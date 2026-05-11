import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { createRedirectionMiddleware } from "./middleware";
import {useDispatch, useSelector} from "react-redux";
import {apiReducers, authReducer} from "./reducers";
import {authApi} from "./api/auth.api";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
    blacklist: [],
};

const rootReducer = combineReducers({
    ...apiReducers,
    ...authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let storeInstance: ReturnType<typeof initStore> | null = null;

const initStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => {
            const middleware = getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                    ignoredActionPaths: [
                        "meta.arg",
                        "meta.baseQueryMeta",
                    ],
                },
            }).concat(
                authApi.middleware,
            );

            if (!middleware.includes(thunk)) {
                middleware.push(thunk);
            }

            const redirectionMiddleware = createRedirectionMiddleware();

            if (!middleware.some((m) => m === redirectionMiddleware)) {
                middleware.push(redirectionMiddleware);
            }

            return middleware;
        },
    });
};

export const initializeStore = () => {
    if (!storeInstance) {
        storeInstance = initStore();
    }

    return storeInstance;
};

export const store = initializeStore();
export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof initStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
