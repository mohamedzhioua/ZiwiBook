import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000" ,
    credentials: "include",
  }),
  tagTypes: ["Post", "Comment", "Reaction", "Photo","Userprofile", "Notif"],
  endpoints: (builder) => ({}),
});
