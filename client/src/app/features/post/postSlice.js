import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
// import { closeModal } from "../modal/modalSlice";
// import postService from "./postService";

const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: () => "/post/getAllPost",
      transformResponse: (responseData) => {
        return postsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),

    fetchPostsByUser: builder.query({
      query: (usernameID) => `/post/${usernameID}/posts`,
      transformResponse: (responseData) => {
        return postsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        console.log("🚀 ~ file: postSlice.js:35 ~ result:", result);
        return [...result.ids.map((id) => ({ type: "Post", id }))];
      },
    }),

    addNewPost: builder.mutation({
      query: (form) => ({
        url: "/post/addPost",
        method: "POST",
        body: form,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    updatePost: builder.mutation({
      query: ({id,dataForm}) => ({
        url: `/post/updatePost/${id}`,
        method: "PATCH",
        body:dataForm ,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),

    deletePost: builder.mutation({
      query: (id ) => ({
        url:`/post/deletePost/${id}`,
        method: "DELETE",
        body: id ,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useFetchPostsByUserQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = extendedApiSlice;

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.fetchPosts.select();

// Creates memoized selector
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);

// //creat post
// export const addPost = createAsyncThunk("posts/add", async (post, thunkAPI) => {
//   const { rejectWithValue, dispatch } = thunkAPI;
//   try {
//     dispatch(closeModal());
//     return await postService.addPost(post);
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// // fetch all posts
// export const fetchPosts = createAsyncThunk(
//   "posts/fetchAll",
//   async (_, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       return await postService.fetchAll();
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // delete a post
// export const deleteOne = createAsyncThunk(
//   "posts/deleteOne",
//   async (id, thunkAPI) => {
//     const { rejectWithValue, dispatch } = thunkAPI;
//     try {
//       dispatch(closeModal());
//       return await postService.deleteOne(id);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // update a post
// export const updatePost = createAsyncThunk(
//   "posts/updatePost",
//   async ({ id, form }, thunkAPI) => {
//     const { rejectWithValue, dispatch } = thunkAPI;
//     try {
//       dispatch(closeModal());
//       return await postService.updatePost(id, form);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// //find a post by id
// export const FindPost = createAsyncThunk(
//   "posts/FindPost",
//   async (id, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       return await postService.FindPost(id);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// //like  post
// export const likePost = createAsyncThunk(
//   "posts/likePost",
//   async (id, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       return await postService.likePost(id);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // fetch all User posts
// export const fetchUserPosts = createAsyncThunk(
//   "posts/fetchUserPosts",
//   async (usernameID, thunkAPI) => {
//     const { rejectWithValue } = thunkAPI;
//     try {
//       return await postService.fetchUserPosts(usernameID);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
// export const postSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     reset: (state) => {
//       state.error = null;
//       state.status = "idle";
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPosts.pending, (state, action) => {
//         state.status = "Loading";
//         state.error = null;
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//         postsAdapter.upsertMany(state, action.payload);
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       .addCase(addPost.pending, (state, action) => {
//         state.status = "Loading";
//         state.error = null;
//       })
//       .addCase(addPost.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//         postsAdapter.addOne(state, action.payload);
//       })
//       .addCase(addPost.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       .addCase(deleteOne.pending, (state, action) => {
//         state.status = "Loading";
//         state.error = null;
//       })
//       .addCase(deleteOne.fulfilled, (state, action) => {
//         state.status = "fulfilled";

//         const { arg } = action.meta;
//         if (arg) {
//           postsAdapter.removeOne(state, arg);
//           // state.posts = state.posts.filter((item) => item._id !== arg);
//         }
//       })
//       .addCase(deleteOne.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(updatePost.pending, (state, action) => {
//         state.status = "Loading";
//         state.error = null;
//       })
//       .addCase(updatePost.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//         postsAdapter.upsertOne(state, action.payload);

//         // const {
//         //   arg: { id },
//         // } = action.meta;
//         // if (id) {
//         //   state.posts = state.posts.map((item) =>
//         //     item._id === id ? action.payload : item
//         //   );
//         // }
//       })
//       .addCase(updatePost.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(likePost.pending, (state, action) => {
//         state.status = "Loading";
//         state.error = null;
//       })
//       .addCase(likePost.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//         postsAdapter.upsertOne(state, action.payload);
//         // const { arg } = action.meta;
//         // if (arg) {
//         //   const posts = state.posts.filter((item) => item._id !== arg);
//         //   state.posts = [...posts, action.payload];
//         // }
//       })
//       .addCase(likePost.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })
//       .addCase(fetchUserPosts.pending, (state, action) => {
//         state.status = "Loading";
//         state.error = null;
//       })
//       .addCase(fetchUserPosts.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//         postsAdapter.upsertMany(state, action.payload);
//       })
//       .addCase(fetchUserPosts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// export const { reset } = postSlice.actions;
// export default postSlice.reducer;
