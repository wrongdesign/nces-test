"use client";

import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { useLazyGetTagsQuery } from "@/shared/model/store/api/task.api";
import { useApiErrorToast } from "@/shared/model/hooks/useApiErrorToast";
import { useEffect } from "react";
import {
  setFetchTags,
  setTags,
} from "@/shared/model/store/slices/task/task.slice";

const useGetTags = () => {
  const dispatch = useAppDispatch();

  const fetchTags = useAppSelector((state) => state.task.fetchTags);

  const [getTags, { data: tags, isLoading: tagsLoading, error: getTagsError }] =
    useLazyGetTagsQuery();

  useApiErrorToast(getTagsError);

  useEffect(() => {
    if (fetchTags) {
      getTags().unwrap();
    }
  }, [fetchTags, getTags]);

  useEffect(() => {
    if (tags) {
      dispatch(setFetchTags(false));
      dispatch(setTags(tags));
    }
  }, [tags, dispatch]);

  return {
    tagsLoading,
  };
};

export default useGetTags;
