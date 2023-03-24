import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (Credentials) => ({
        url: "/api/users/signin",
        method: "POST",
        body: { ...Credentials },
      }),
      
    }),

    register: builder.mutation({
      query: (credentials) => {
        return {
          url: "/api/users/signup",
          method: "POST",
          body: { ...credentials },
        };
      },
    }),

    Logout: builder.mutation({
      query: () => {
        return {
          url: "/api/users/logout",
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
