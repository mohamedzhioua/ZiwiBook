import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import postReducer from "./features/post/postSlice";
import modalReducer from "./features/modal/modalSlice";
import commentReducer from "./features/comment/commentSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    modal: modalReducer,
    comment:commentReducer,
  },
});
