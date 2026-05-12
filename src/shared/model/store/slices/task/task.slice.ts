import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {TaskState} from "./task.model";
import type {Task, TaskPaginationInfo} from "@/entities/task";

const initialState: TaskState = {
    pagination: undefined,
    tasks: undefined,
    selectedTaskId: undefined,
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<{ tasks: Task[], pagination?: TaskPaginationInfo }>) => {
            state.tasks = action.payload.tasks;
            state.pagination = action.payload.pagination;
        },
        setSelectedTaskId: (state, action: PayloadAction<string | undefined>) => {
          state.selectedTaskId = action.payload
        },
        clearTasks: () => {
            return initialState;
        },
    },
});

export const { setTasks, clearTasks, setSelectedTaskId } = taskSlice.actions;
export default taskSlice.reducer;
