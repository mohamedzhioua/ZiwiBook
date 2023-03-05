import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../api/apiSlice";

const reactionAdapter = createEntityAdapter({
  selectId: (reaction) => reaction._id,
});

const initialState = reactionAdapter.getInitialState();

export const reactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    fetchReactions: builder.query({
      query: (id) => `/post/getPostReactions/${id}`,
      transformResponse: (responseData) => {        console.log("🚀 ~ file: reactionSlice.js:17 ~ responseData:", responseData)

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
