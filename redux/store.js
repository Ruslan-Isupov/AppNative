import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authPostsReducer from "./auth/authSlice";
// import { authSlice } from "./auth/authSlice";

const rootReducer = combineReducers({
  auth: authPostsReducer,
});

export const store = configureStore({
  // reducer: authPostsReducer,
  reducer: rootReducer,
  // authReducer: authPostsReducer,
});
