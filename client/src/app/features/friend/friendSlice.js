import { apiSlice } from "../../api/apiSlice";

export const FriendsApiSlic = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FetchFriends: builder.query({
      query: () => `/friend/getAllfriends`,
      providesTags: ["Friend"],
    }),

    FriendFunc: builder.mutation({
      query: ({ id, type }) => ({
        url: `/friend/${type}/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Friend"],
    }),
    // updateProfilePhoto: builder.mutation({
    //   query: (credentials) => ({
    //     url: "/user/update/profile/Photo",
    //     method: "POST",
    //     body: credentials,
    //   }),
    //   invalidatesTags: ["Friend"],
    // }),
  }),
});

export const { useFetchFriendsQuery, useFriendFuncMutation } = FriendsApiSlic;
