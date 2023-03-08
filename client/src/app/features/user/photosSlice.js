import { apiSlice } from "../../api/apiSlice";

export const PhotosApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FetchPhotos: builder.query({
      query: (username) => `/user/${username}/photos`,
      providesTags: ["Photo"],
    }),
    updateCoverPhoto: builder.mutation({
      query: (credentials) => ({
        url: "/user/update/profile/cover",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Photo"],
    }),
    updateProfilePhoto: builder.mutation({
      query: (credentials) => ({
        url: "/user/update/profile/Photo",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Photo"],
    }),
  }),
});

export const {
  useFetchPhotosQuery,
  useUpdateCoverPhotoMutation,
  useUpdateProfilePhotoMutation,
} = PhotosApiSlice;
