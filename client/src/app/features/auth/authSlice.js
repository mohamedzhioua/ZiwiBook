import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/signin",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    register: builder.mutation({
      query: (credentials) => {
        return {
          url: "/user/signup",
          method: "POST",
          body: { ...credentials },
        };
      },
    }),

    Logout: builder.mutation({
      query: () => {
        return {
          url: "/user/logout",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
} = authApiSlice;
