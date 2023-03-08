import { apiSlice } from "../../api/apiSlice";

export const FriendsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FetchFriends: builder.query({
      query: () => `/user/Friends`,
      providesTags: ["Friend"],
    }),
    addFriend: builder.mutation({
      query: (id) => ({
        url: `/user/add/${id}`,
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

export const {
useFetchFriendsQuery,
useAddFriendMutation,
} = FriendsApiSlice;
