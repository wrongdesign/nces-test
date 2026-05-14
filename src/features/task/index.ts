export {default as TaskComponent} from "./ui/TaskComponent";

export { PAGINATION_LIMIT_ARRAY } from "./model/constants/common";
export { selectTriggerClassNames, selectItemClassNames } from "./model/config/filters";

export {default as TaskList} from "./ui/TaskList";
export {default as StatusChange} from "./ui/StatusChange";
export {default as useUpdateTaskStatus} from "./api/hooks/useUpdateTaskStatus";
export {default as TaskDetails} from "./ui/details/TaskDetails";
export {default as TaskDetailsInfoForm} from "./ui/details/TaskDetailsInfoForm";
export {default as FiltersBlock} from "./ui/filters/FiltersBlock";
export {default as SelectFiltersList} from "./ui/filters/SelectFiltersList";
export {default as SearchByName} from "./ui/filters/SearchByName";
export {default as SortingComponent} from "./ui/filters/SortingComponent";
export {default as TaskPagination} from "./ui/TaskPagination";