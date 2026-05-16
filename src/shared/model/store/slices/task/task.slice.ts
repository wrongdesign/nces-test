import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {TaskFiltersModel, TaskPaginationResponse, TaskState} from "./task.model";
import {type Tag, type Task, TaskSortingEnum} from "@/entities/task";
import {PAGINATION_LIMIT_ARRAY} from "@/features/task";
import type {Pagination} from "@/shared/model/types/common";

const initialState: TaskState = {
    fetchTags: true,
    fetchTasks: true,
    filters: {
        sorting: TaskSortingEnum.CREATED_AT
    },
    pagination: undefined,
    selectedTask: undefined,
    currentPagination: {
        page: 1,
        limit: PAGINATION_LIMIT_ARRAY[0],
    },
    tags: undefined,
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
        setFilters: (state, action: PayloadAction<Partial<TaskFiltersModel>>) => {
            state.filters = {...state.filters, ...action.payload};
            state.currentPagination = { ...state.currentPagination, page: 1 };
            state.fetchTasks = true;
        },
        setTags: (state, action: PayloadAction<Tag[] | undefined>) => {
            state.tags = action.payload;
        },
        setPaginationInfo: (state, action: PayloadAction<TaskPaginationResponse>) => {
            state.pagination = action.payload.pagination;
        },
        setCurrentPagination: (state, action: PayloadAction<Pagination>) => {
            state.currentPagination = action.payload;
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
    setCurrentPagination,
    setFilters,
    setFetchTasks,
    setFetchTags,
    setTags,
} = taskSlice.actions;
export default taskSlice.reducer;
