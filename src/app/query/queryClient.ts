import { QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ApiError } from "@/shared/api/ApiError";
import { store } from "../store/store";
import { authActions } from "@/features/auth/model/authSlice";

const handleAuthError = (error: ApiError) => {
  if (error.status === 401 || error.status === 403) {
    const storedAuth = store.getState().auth
    if (!storedAuth.tokens?.accessToken) {
      store.dispatch(authActions.signOut())
    }
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof ApiError) {
        handleAuthError(error);
        if (error.status >= 500) {
          toast.error("Server error. Please try again later.");
        }
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error instanceof ApiError) {
        handleAuthError(error);
        if (error.status >= 500) {
          toast.error("Server error. Please try again later.");
        }
      }
    },
  }),
});
