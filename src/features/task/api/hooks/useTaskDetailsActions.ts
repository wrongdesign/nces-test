"use client";

import {
  useTaskCreate,
  useTaskUpdate,
  useUpdateTaskStatus,
} from "@/features/task";

const useTaskDetailsActions = () => {
  const { onSubmit: createTaskSubmit, loading: createTaskLoading } =
    useTaskCreate();

  const { handleUpdateTaskStatus, updateStatusLoading } = useUpdateTaskStatus();

  const { updateTaskLoading, handleUpdateTask } = useTaskUpdate();

  const loading: boolean =
    createTaskLoading || updateStatusLoading || updateTaskLoading;

  return {
    loading,
    handleUpdateTaskStatus,
    createTaskSubmit,
    handleUpdateTask,
  };
};

export default useTaskDetailsActions;
