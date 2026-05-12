import {authApi} from "@/shared/model/store/api/auth.api";
import {authSlice} from "@/shared/model/store/slices/auth/auth.slice";
import {taskSlice} from "@/shared/model/store/slices/task/task.slice";
import {taskApi} from "@/shared/model/store/api/task.api";

export const apiReducers = {
    [authApi.reducerPath]: authApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
}

export const authReducer = {
    auth: authSlice.reducer,
}

export const taskReducer = {
    task: taskSlice.reducer,
}