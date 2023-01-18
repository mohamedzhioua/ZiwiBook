import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  comments: [],
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

//Add a Comment to a post
export const AddComment = createAsyncThunk(
  "post/AddComment",
  async ({ postId, text }, thunkAPI) => {
    try {
      return await postService.AddComment(postId, text);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//Add Reply to a Comment
export const addCommentReply = createAsyncThunk(
  "post/addCommentReply",
  async ({ id, text }, thunkAPI) => {
    try {
      return await postService.addCommentReply(id, text);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// fetch all Comments
export const fetchComments = createAsyncThunk(
  "post/fetchComments",
  async (thunkAPI) => {
    try {
      return await postService.fetchComments();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// delete a comment
export const deleteComment = createAsyncThunk(
  "post/deleteComment",
  async (id, thunkAPI) => {
    try {
      return await postService.deleteComment(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// update a comment
export const updateComment = createAsyncThunk(
  "post/updateComment",
  async ({ id, text }, thunkAPI) => {
    try {
      return await postService.updateComment(id, text);
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
      //--------------------------------------------------------comments------------------------------------------------//
      .addCase(AddComment.pending, (state, action) => {})
      .addCase(AddComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(AddComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchComments.pending, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(addCommentReply.pending, (state, action) => {})
      .addCase(addCommentReply.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = [...state.comments, action.payload];
      })
      .addCase(addCommentReply.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state, action) => {})
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { arg } = action.meta;
        if (arg) {
          state.posts = state.comments.filter((item) => item._id !== arg);
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateComment.pending, (state, action) => {})
      .addCase(updateComment.fulfilled, (state, action) => {
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.posts = state.comments.map((item) =>
            item._id === id ? action.payload.updatedComment : item
          );
        }
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
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
