import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/modal/modalSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
   },
  middleware:getDefaultMiddleware=>
  getDefaultMiddleware().concat(apiSlice.middleware)
});
