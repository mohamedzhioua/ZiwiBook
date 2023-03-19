import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";


const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPosts: builder.query({
      query: () => "/posts/getAllPost",
      transformResponse: (responseData) => {
        return postsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result?.ids.map((id) => ({ type: "Post", id })),
      ],
    }),

    fetchPostsByUser: builder.query({
      query: (usernameID) => `/posts/${usernameID}/posts`,
      transformResponse: (responseData) => {
        return postsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        return [...result?.ids.map((id) => ({ type: "Post", id }))];
      },
    }),
  
    fetchPost: builder.query({
      query: (id) => `/posts/getOnePost/${id}`,
      transformResponse: (responseData) => {
        return postsAdapter.setOne(initialState, responseData);
      },
      providesTags: (result, error, id) =>  [{ type: "Post", id }],
      }
    ),

    addNewPost: builder.mutation({
      query: (form) => ({
        url: "/posts/addPost",
        method: "POST",
        body: form,
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),

    updatePost: builder.mutation({
      query: ({ id, dataForm }) => ({
        url: `/posts/updatePost/${id}`,
        method: "PATCH",
        body: dataForm,
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/deletePost/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useFetchPostsByUserQuery,
  useFetchPostQuery,
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
