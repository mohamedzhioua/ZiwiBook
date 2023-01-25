import {
  createSlice,
  createAsyncThunk,
  //   createEntityAdapter,
} from "@reduxjs/toolkit";
import commentService from "./commentService";



const initialState = {
  comments: [], 
  error: null,
  status: "idle", //'idle' | 'loading' | 'fulfilled' | 'failed'
};

//creat a Comment
export const AddComment = createAsyncThunk(
  "comment/AddComment",
  async ({ id, text }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await commentService.AddComment(id, text);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//Add Reply to a Comment
export const addCommentReply = createAsyncThunk(
  "comment/addCommentReply",
  async ({ id, text }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await commentService.addCommentReply(id, text);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// fetch all Comments
export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await commentService.fetchComments();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// delete a comment
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await commentService.deleteComment(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// update a comment
export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async ({ id, text }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      return await commentService.updateComment(id, text);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//like  comment
export const likeComment = createAsyncThunk(
  "comment/likeComment",
  async (id, thunkAPI) => {
    console.log("🚀 ~ file: commentSlice.js:85 ~ id", id)
    const { rejectWithValue } = thunkAPI;
    try {
      return await commentService.likeComment(id);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(likeComment.pending, (state, action) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const { arg } = action.meta;
        if (arg) {
          const comments = state.comments.filter((item) => item._id !== arg);
          state.comments = [...comments, action.payload];
        }
      })
      .addCase(likeComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
