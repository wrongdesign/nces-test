"use client";

import { useAppDispatch, useAppSelector } from "@/shared/model/store";
import { Input } from "@/shared/ui/input";
import React, { useEffect, useState } from "react";
import useDebounce from "@/shared/model/hooks/useDebounce";
import { setFilters } from "@/shared/model/store/slices/task/task.slice";

const SearchByName = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.task.filters);

  const [name, setName] = useState<string>(filters?.name ?? "");

  const { debouncedVal } = useDebounce<string>({ value: name, delay: 500 });

  useEffect(() => {
    dispatch(
      setFilters({ name: debouncedVal.length > 0 ? debouncedVal : undefined }),
    );
  }, [debouncedVal, dispatch]);

  return (
    <Input
      className="col-span-2"
      placeholder={"Search by task title"}
      type={"text"}
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
  );
};

export default SearchByName;
