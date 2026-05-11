import {authApi} from "@/shared/model/store/api/auth.api";

export const apiReducers = {
    [authApi.reducerPath]: authApi.reducer,
}