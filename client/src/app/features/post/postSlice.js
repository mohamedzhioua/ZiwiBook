import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { closeModal } from "../modal/modalSlice";
import postService from "./postService";

const initialState = {
  posts: [],
  comments: [],
  error: null,
  status: "idle",
};

//creat post
export const addPost = createAsyncThunk("post/add", async (post, thunkAPI) => {
  const { rejectWithValue, dispatch } = thunkAPI;
  try {
    dispatch(closeModal());
    return await postService.addPost(post);
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// fetch all posts
export const fetchPosts = createAsyncThunk(
  "post/fetchAll",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await postService.fetchAll();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a post
export const deleteOne = createAsyncThunk(
  "post/deleteOne",
  async (id, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      dispatch(closeModal());
      return await postService.deleteOne(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a post
export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, form }, thunkAPI) => {
    const { rejectWithValue, dispatch } = thunkAPI;
    try {
      dispatch(closeModal());
      return await postService.updatePost(id, form);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//find a post by id
export const FindPost = createAsyncThunk(
  "post/FindPost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await postService.FindPost(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//like  post
export const likePost = createAsyncThunk(
  "post/likePost",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await postService.likePost(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//creat a Comment
export const AddComment = createAsyncThunk(
  "post/AddComment",
  async ({ id, text }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await postService.AddComment(id, text);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Add Reply to a Comment
export const addCommentReply = createAsyncThunk(
  "post/addCommentReply",
  async ({ id, text }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await postService.addCommentReply(id, text);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// fetch all Comments
export const fetchComments = createAsyncThunk(
  "post/fetchComments",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await postService.fetchComments();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a comment
export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await postService.deleteComment(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a comment
export const updateComment = createAsyncThunk(
  "post/updateComment",
  async ({ id, text }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await postService.updateComment(id, text);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.posts = [action.payload.memo, ...state.posts];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteOne.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(deleteOne.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const { arg } = action.meta;
        if (arg) {
          state.posts = state.posts.filter((item) => item._id !== arg);
        }
      })
      .addCase(deleteOne.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = "fulfilled";

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
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(likePost.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const { arg } = action.meta;
        if (arg) {
          const posts = state.posts.filter((item) => item._id !== arg);
          state.posts = [...posts, action.payload];
        }
      })
      .addCase(likePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      //--------------------------------------------------------comments------------------------------------------------//
      .addCase(AddComment.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(AddComment.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.comments = [action.payload, ...state.comments];
      })
      .addCase(AddComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchComments.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(addCommentReply.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(addCommentReply.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.comments = [action.payload, ...state.comments];
      })
      .addCase(addCommentReply.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const { arg } = action.meta;
        if (arg) {
          state.comments = state.comments.filter((item) => item._id !== arg);
        }
      })

      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateComment.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.comments = state.comments.map((item) =>
            item._id === id ? action.payload.updatedComment : item
          );
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
