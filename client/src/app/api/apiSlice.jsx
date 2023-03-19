import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: 'api', // optional
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000" ,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token
      if (token) {
          headers.set("authorization", `Bearer ${token}`)
      }
      return headers
  }
  }),
  tagTypes: ["Post", "Comment", "Reaction", "Photo", "Friend", "Userprofile", "Notif"],
  endpoints: (builder) => ({}),
});
