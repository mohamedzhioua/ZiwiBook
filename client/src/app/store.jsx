import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import userReducer from "./features/user/userSlice";
import modalReducer from "./features/modal/modalSlice";
import { useFetchCommentsQuery } from "./features/comment/commentApi";
export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    [apiSlice.reducerPath]:apiSlice.reducer,
   },
  middleware:getDefaultMiddleware=>
  getDefaultMiddleware().concat(apiSlice.middleware)
});
