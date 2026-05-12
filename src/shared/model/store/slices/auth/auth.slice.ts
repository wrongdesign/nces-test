import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {type User, type UserBase, UserStatusesEnum} from "@/entities/user";

const userInitial: UserBase = {
    index: 0,
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    status: UserStatusesEnum.ACTIVE,
};

const initialState: User = {
    user: userInitial,
    access_token: undefined,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
        },
        clearUser: (state) => {
            state.user = initialState.user;
            state.access_token = undefined;
        },
    },
});

export const { updateUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
