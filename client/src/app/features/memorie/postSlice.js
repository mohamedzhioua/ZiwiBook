import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  error: "",
  message: "",
  isLoading: false,
  fulfilled: false,
};

//add post
export const addPost = createAsyncThunk("post/add", async (post, thunkAPI) => {
  try {
    return await postService.addPost(post);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// fetch all posts
export const fetchPosts = createAsyncThunk(
  "post/fetchAll",
  async (thunkAPI) => {
    try {
      return await postService.fetchAll();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// delete a post
export const deleteOne = createAsyncThunk(
  "post/deleteOne",
  async (id, thunkAPI) => {
    try {
      return await postService.deleteOne(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// update a post
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, form }, thunkAPI) => {
    try {
      return await postService.updatePost(id, form);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.error= "";
      state.message= "";
      state.isLoading= false;
      state.fulfilled= false;
    },
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
        state.fulfilled = true;
      })
      .addCase(addPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteOne.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteOne.fulfilled, (state, action) => {
        console.log("🚀 ~ file: postSlice.js:93 ~ .addCase ~ action", action)
        state.isLoading = false;
        state.message = action.payload.message;
        state.fulfilled = true;
        const {arg} =action.meta 
        if(arg){state.posts = state.posts.filter((post)=>post._id !== arg)
        }
      })
      .addCase(deleteOne.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
        state.fulfilled = true;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
