import { apiSlice } from "../../api/apiSlice";

export const UserProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: (username) => `/user/getUserProfile/${username}`,
      providesTags: ["Userprofile"],
    }),
    FriendFunc: builder.mutation({
      query: ({ id, type }) => ({
        url: `/friend/${type}/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Userprofile"],
    }),
  }),
});

export const { useFetchUserProfileQuery , useFriendFuncMutation } = UserProfileApiSlice;
