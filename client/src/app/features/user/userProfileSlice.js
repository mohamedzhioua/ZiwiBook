import { apiSlice } from "../../api/apiSlice";

export const UserProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: (username) => `/user/getUserProfile/${username}`,
      providesTags: ["Users"],
    }),
  }),
});

export const { useFetchUserProfileQuery } = UserProfileApiSlice;
