import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

// Get token from localStorage
const initialState = {
  post: [],
  error: "",
  message: "",
  isLoading: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase((state, action) => {})
      .addCase((state, action) => {})
      .addCase((state, action) => {});
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
