import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  post: {},
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

//find a post by id
export const FindPost = createAsyncThunk(
  "post/FindPost",
  async (id, thunkAPI) => {
    try {
      return await postService.FindPost(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//like  post
export const likePost = createAsyncThunk(
  "post/likePost",
  async (id, thunkAPI) => {
    try {
      return await postService.likePost(id);
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
      state.error = "";
      state.message = "";
      state.isLoading = false;
      state.fulfilled = false;
      state.post = {};
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
        state.posts = [...state.posts, action.payload.memo];
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
        state.isLoading = false;
        state.message = action.payload.message;
        state.fulfilled = true;
        const { arg } = action.meta;
        if (arg) {
          state.posts = state.posts.filter((item) => item._id !== arg);
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
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.posts = state.posts.map((item) =>
            item._id === id ? action.payload.memo : item
          );
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.pending, (state, action) => {})
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const { arg } = action.meta;
        if (arg) {
          state.posts = state.posts.map((item) =>
            item._id === arg ? action.payload : item
          );
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(FindPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(FindPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.post = action.payload;
      })
      .addCase(FindPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
