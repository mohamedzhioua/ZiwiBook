import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: fetchBaseQuery(),
  tagTypes: ["Post","Comment","Reaction","Photo","Friend","Userprofile","Notif"],
  endpoints: (builder) => ({}),
});
