import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import  {socket}  from "../../../routes/PrivateRoute"
import { apiSlice } from "../../api/apiSlice";

const reactionAdapter = createEntityAdapter({
  selectId: (reaction) => reaction._id,
});

const initialState = reactionAdapter.getInitialState();

export const reactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    fetchReactions: builder.query({
      query: () => "/post/getPostsReactions/",
      transformResponse: (responseData) => {
        return reactionAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => [
        { type: "Reaction", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Reaction", id })),
      ],
    }),

    likePost: builder.mutation({
      query: (id) => ({
        url: `/post/like/${id}`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Reaction", id: arg.id },
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


export const { useFetchReactionsQuery, useLikePostMutation } = reactionApiSlice;

// returns the query result object
export const selectReactionsResult =
  reactionApiSlice.endpoints.fetchReactions.select();

// Creates memoized selector
const selectReactionsData = createSelector(
  selectReactionsResult,
  (reactionsResult) => reactionsResult.data // normalized state object with ids & entities
);

export const {
  selectAll: selectAllReactions,
  selectById: selectReactionById,
  selectIds: selectReactionIds,
} = reactionAdapter.getSelectors(
  (state) => selectReactionsData(state) ?? initialState
);
