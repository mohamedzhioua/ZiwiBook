import { apiSlice } from "../../api/apiSlice";




export const UsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    fetchUserProfile: builder.query({
      query: (username) => `/user/getUserProfile/${username}`,
      providesTags:["Users"],
    }),

  }),
});

export const {
useFetchUserProfileQuery,
} = UsersApiSlice;

