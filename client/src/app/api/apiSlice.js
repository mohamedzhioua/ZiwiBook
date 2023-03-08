import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Post","Comment","Reaction","Photos"],
  endpoints: (builder) => ({}),
});
