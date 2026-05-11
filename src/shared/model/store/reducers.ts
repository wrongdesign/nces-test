import {authApi} from "@/shared/model/store/api/auth.api";
import {authSlice} from "@/shared/model/store/slices/auth/auth.slice";

export const apiReducers = {
    [authApi.reducerPath]: authApi.reducer,
}

export const authReducer = {
    auth: authSlice.reducer,
}