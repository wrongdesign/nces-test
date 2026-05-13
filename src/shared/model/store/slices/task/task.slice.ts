import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {TaskPaginationResponse, TaskState} from "./task.model";
import type {Task} from "@/entities/task";

const initialState: TaskState = {
    fetchTags: true,
    fetchTasks: true,
    tasks: undefined,
    pagination: undefined,
    selectedTask: undefined,
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
        setTasks: (state, action: PayloadAction<Task[] | undefined>) => {
            state.tasks = action.payload;
        },
        setUpdatedTask: (state, action: PayloadAction<Task>) => {
            if (state.tasks) {
                state.tasks = state.tasks.map((task) => task.id === action.payload.id ?
                    { ...task, ...action.payload } : task
                )
            }
        },
        setPaginationInfo: (state, action: PayloadAction<TaskPaginationResponse>) => {
            state.pagination = action.payload.pagination;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
            state.fetchTasks = true;
        },
        setSelectedTask: (state, action: PayloadAction<Task | undefined>) => {
            state.selectedTask = action.payload;
        },
        clearTasks: () => {
            return initialState;
        },
    },
});

export const {
    setPaginationInfo,
    clearTasks,
    setSelectedTask,
    setCurrentPage,
    setTasks,
    setUpdatedTask,
    setFetchTasks,
    setFetchTags,
} = taskSlice.actions;
export default taskSlice.reducer;
