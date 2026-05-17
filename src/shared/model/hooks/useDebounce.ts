"use client";

import { useEffect, useState } from "react";

interface Props<T> {
  value: T;
  delay: number;
}

const useDebounce = <T>({ value, delay }: Props<T>) => {
  const [debouncedVal, setDebouncedVal] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedVal(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return {
    debouncedVal,
  };
};

export default useDebounce;
