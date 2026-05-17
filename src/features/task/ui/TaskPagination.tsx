"use client";

import { Field, FieldLabel } from "@/shared/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination";
import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { setCurrentPagination } from "@/shared/model/store/slices/task/task.slice";
import { PAGINATION_LIMIT_ARRAY } from "@/features/task";
import { cn } from "@/shared/model/utils/utils";

const TaskPagination = () => {
  const dispatch = useAppDispatch();
  const currentPagination = useAppSelector(
    (state) => state.task.currentPagination,
  );
  const taskPaginationInfo = useAppSelector((state) => state.task.pagination);

  const goPrevious = () => {
    if (!taskPaginationInfo?.hasPrevPage) return;

    dispatch(
      setCurrentPagination({
        ...currentPagination,
        page: currentPagination.page - 1,
      }),
    );
  };

  const goNext = () => {
    if (!taskPaginationInfo?.hasNextPage) return;

    dispatch(
      setCurrentPagination({
        ...currentPagination,
        page: currentPagination.page + 1,
      }),
    );
  };
  return (
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Items on page</FieldLabel>
        <Select
          defaultValue={String(currentPagination.limit)}
          onValueChange={(value) => {
            dispatch(setCurrentPagination({ page: 1, limit: Number(value) }));
          }}
        >
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              {PAGINATION_LIMIT_ARRAY.map((item) => (
                <SelectItem
                  key={`${item}-pagination-item`}
                  value={String(item)}
                >
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem
            onClick={goPrevious}
            className={cn(
              "cursor-pointer",
              !taskPaginationInfo?.hasPrevPage && "cursor-not-allowed",
            )}
          >
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem
            onClick={goNext}
            className={cn(
              "cursor-pointer",
              !taskPaginationInfo?.hasNextPage && "cursor-not-allowed",
            )}
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TaskPagination;
