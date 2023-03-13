import { apiSlice } from "../../api/apiSlice";

export const NotificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FetchNotif: builder.query({
      query: () => `/notification/notifies`,
      providesTags: ["Notif"],
    }),

    addNotif: builder.mutation({
      query: (post) => ({
        url: `/notification/add`,
        method: "POST",
        body: {
          recipient: post.owner._id,
          url: `/post/${post._id}`,
          content: "Liked your post.",
          type: "react",
        },
      }),
      invalidatesTags: ["Notif"],
    }),
  }),
});

export const { useFetchNotifQuery, useAddNotifMutation } =
  NotificationsApiSlice;
