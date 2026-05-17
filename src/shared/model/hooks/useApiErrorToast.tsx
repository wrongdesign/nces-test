import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "sonner";

interface HandledError {
  status: string;
  message: string;
}

type ApiError =
  | HandledError
  | FetchBaseQueryError
  | SerializedError
  | undefined;

export const useApiErrorToast = (error: ApiError | HandledError) => {
  useEffect(() => {
    if (error) {
      let message = "Unknown error";

      if ("message" in error && error.message) {
        message = error.message;
      }

      toast.error(message, {
        id: "api-error-toast",
        position: "bottom-center",
        className: "toast_display",
        duration: 7000,
      });
    }
  }, [error]);
};
