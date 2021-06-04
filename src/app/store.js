import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/auth/authSlice";
import repositoryReducer from "../features/repository/repositorySlice";

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    user: repositoryReducer,
  },
});
