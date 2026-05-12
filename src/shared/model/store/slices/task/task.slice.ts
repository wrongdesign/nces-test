import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {TaskResponse, TaskState} from "./task.model";

const initialState: TaskState = {
    pagination: undefined,
    tasks: undefined,
    selectedTaskId: undefined,
    currentPage: 1,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<TaskResponse>) => {
            state.tasks = action.payload.tasks;
            state.pagination = action.payload.pagination;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
          state.currentPage = action.payload
        },
        setSelectedTaskId: (state, action: PayloadAction<string | undefined>) => {
          state.selectedTaskId = action.payload
        },
        clearTasks: () => {
            return initialState;
        },
    },
});

export const { setTasks, clearTasks, setSelectedTaskId, setCurrentPage } = taskSlice.actions;
export default taskSlice.reducer;
