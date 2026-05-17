import { isRejectedWithValue, type Middleware } from "@reduxjs/toolkit";
import { redirectToLogin } from "./redirect";

export const createRedirectionMiddleware = (): Middleware => {
  return (store) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const status = (action.payload as { status?: number })?.status;

      if (status === 401 || status === 403) {
        store.dispatch(redirectToLogin("/"));
      }
    }

    return next(action);
  };
};
