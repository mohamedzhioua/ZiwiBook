import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import modalReducer from "./features/modal/modalSlice";
import commentReducer from "./features/comment/commentSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
    modal: modalReducer,
    comment:commentReducer,
  },
  middleware:getDefaultMiddleware=>
  getDefaultMiddleware().concat(apiSlice.middleware)
});
