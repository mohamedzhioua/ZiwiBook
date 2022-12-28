import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  post: [],
  error: "",
  message: "",
  isLoading: false,
};

//add post
export const addPost = createAsyncThunk("post/add", async (post, thunkAPI) => {
  try {
    return await postService.addPost(post);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
