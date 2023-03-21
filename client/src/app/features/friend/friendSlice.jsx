import { apiSlice } from "../../api/apiSlice";

export const FriendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FetchFriends: builder.query({
      query: () => `/friends/`,
      providesTags: ["Friend"],
    }),

    
  }),
});

export const { useFetchFriendsQuery } = FriendsApiSlice;
