import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";
import { socket } from "../../../routes/PrivateRoute";

const commentsAdapter = createEntityAdapter({
  selectId: (comment) => comment._id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt),
});

const initialState = commentsAdapter.getInitialState();

export const CommentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchComments: builder.query({
      query: () => "/post/getComments",
      transformResponse: (responseData) => {
        return commentsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Comment", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Comment", id })),
      ],
    }),

    addNewComment: builder.mutation({
      query: ({ id, text }) => {
        return {
          url: `/post/addComment/${id}`,
          method: "POST",
          body: { text },
        };
      },
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
      transformResponse: (responseData) => {
        const newNotification = responseData?.newNotif;
        if (newNotification) {
          socket.emit("notification", { notification: newNotification });
        }
      },
    }),

    addCommentReply: builder.mutation({
      query: ({ id, text }) => ({
        url: `/post/addCommentReply/${id}`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: [{ type: "Comment", id: "LIST" }],
      transformResponse: (responseData) => {
        const newNotification = responseData?.newNotif;
        if (newNotification) {
          socket.emit("notification", { notification: newNotification });
        }
      },
    }),

    updateComment: builder.mutation({
      query: ({ id, text }) => ({
        url: `/post/updateComment/${id}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.id },
      ],
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/post/deleteComment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.id },
      ],
    }),

    likeComment: builder.mutation({
      query: (id) => ({
        url: `/post/Commentlike/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Comment", id: arg.id },
      ],
      transformResponse: (responseData) => {
        const newNotification = responseData?.newNotif;
        if (newNotification) {
          socket.emit("notification", { notification: newNotification });
        }
      },
    }),
  }),
});

export const {
  useFetchCommentsQuery,
  useAddNewCommentMutation,
  useAddCommentReplyMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} = CommentApiSlice;

// returns the query result object
export const selectCommentsResult =
  CommentApiSlice.endpoints.fetchComments.select();

// Creates memoized selector
const selectCommentsData = createSelector(
  selectCommentsResult,
  (commentResult) => commentResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllComments,
  selectById: selectCommentById,
  selectIds: selectCommentIds,
  // Pass in a selector that returns the posts slice of state
} = commentsAdapter.getSelectors(
  (state) => selectCommentsData(state) ?? initialState
);
