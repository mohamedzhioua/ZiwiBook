import { apiSlice } from "../../api/apiSlice";

export const SearchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    Search: builder.mutation({
      query: (credentials) => ({
        url: "/user/search",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const { useSearchMutation } = SearchApiSlice;
