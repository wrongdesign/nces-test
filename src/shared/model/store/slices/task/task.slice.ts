import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {TaskPaginationResponse, TaskState} from "./task.model";

const initialState: TaskState = {
    fetchTags: true,
    fetchTasks: true,
    pagination: undefined,
    selectedTaskId: undefined,
    currentPage: 1,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setFetchTags: (state, action: PayloadAction<boolean>) => {
            state.fetchTags = action.payload;
        },
        setFetchTasks: (state, action: PayloadAction<boolean>) => {
            state.fetchTasks = action.payload;
        },
        setPaginationInfo: (state, action: PayloadAction<TaskPaginationResponse>) => {
            state.pagination = action.payload.pagination;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
            state.fetchTasks = true;
        },
        setSelectedTaskId: (state, action: PayloadAction<string | undefined>) => {
            state.selectedTaskId = action.payload;
        },
        clearTasks: () => {
            return initialState;
        },
    },
});

export const {
    setPaginationInfo,
    clearTasks,
    setSelectedTaskId,
    setCurrentPage,
    setFetchTasks,
    setFetchTags,
} = taskSlice.actions;
export default taskSlice.reducer;
