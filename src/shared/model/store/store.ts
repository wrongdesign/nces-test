import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { createRedirectionMiddleware } from "@/shared/model/store/middleware";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [],
    blacklist: [],
};

const rootReducer = combineReducers({
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let storeInstance: ReturnType<typeof initStore> | null = null;

const initStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) => {
            const middleware = getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                    ignoredPaths: [],
                    ignoredActionPaths: [],
                },
            });

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
