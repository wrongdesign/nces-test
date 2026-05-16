export {default as TaskComponent} from "./ui/TaskComponent";

export { PAGINATION_LIMIT_ARRAY } from "./model/constants/common";
export { selectTriggerClassNames, selectItemClassNames } from "./model/config/filters";

export {default as useGetTasks} from "./api/hooks/useGetTasks";
export {default as useTaskCreate} from "./api/hooks/useTaskCreate";
export {default as useGetTags} from "./api/hooks/useGetTags";
export {default as useUpdateTaskStatus} from "./api/hooks/useUpdateTaskStatus";
export {default as useTaskUpdate} from "./api/hooks/useTaskUpdate";
export {default as useCreateTag} from "./api/hooks/useCreateTag";
export {default as useTaskDetailsActions} from "./api/hooks/useTaskDetailsActions";
export {default as useGetTaskDetails} from "./api/hooks/useGetTaskDetails";
export {default as useTaskDelete} from "./api/hooks/useTaskDelete";

export {default as TaskList} from "./ui/TaskList";
export {default as StatusChange} from "./ui/StatusChange";
export {default as TaskDetails} from "./ui/details/TaskDetails";
export {default as TaskDetailsInfoForm} from "./ui/details/form/TaskDetailsInfoForm";
export {default as FiltersBlock} from "./ui/filters/FiltersBlock";
export {default as SelectFiltersList} from "./ui/filters/SelectFiltersList";
export {default as SearchByName} from "./ui/filters/SearchByName";
export {default as SortingComponent} from "./ui/filters/SortingComponent";
export {default as TaskPagination} from "./ui/TaskPagination";
export {default as PriorityRadio} from "./ui/details/form/PriorityRadio";
export {default as ControlledDatePicker} from "./ui/details/form/ControlledDatePicker";
export {default as ControlledTagAutocomplete} from "./ui/details/form/ControlledTagAutocomplete";
export {default as DeleteTask} from"./ui/details/DeleteTask";

export {type TaskSchemaType, taskSchema} from "./model/schemas/details.schema";

export {type CreateTaskForm, submitFormText} from "./model/types/form";