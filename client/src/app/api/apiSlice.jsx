import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: fetchBaseQuery({
    // baseUrl: import.meta.env.VITE_API_BASE_URL ,
    baseUrl:"https://ziwibook-mv8q.onrender.com",
    credentials: "include",
  }),
  tagTypes: ["Post", "Comment", "Reaction", "Photo","Userprofile", "Notif"],
  endpoints: (builder) => ({}),
});
