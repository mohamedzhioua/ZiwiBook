import { apiSlice } from "../../api/apiSlice";



export const PhotosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FetchPhotos: builder.query({
      query: (username) => `/user/${username}/photos`,
      providesTags:["Photos"]
    }),
  }),
});

export const { useFetchPhotosQuery } = PhotosApiSlice;

