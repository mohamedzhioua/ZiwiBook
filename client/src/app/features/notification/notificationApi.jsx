import { apiSlice } from "../../api/apiSlice";

export const NotificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FetchNotif: builder.query({
      query: () => `/notification/notifies`,
      providesTags: ["Notif"],
    }),

    isNotifSeen: builder.mutation({
      query: (id) => ({
        url: `/notification/isNotifSeen/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notif"],
    }),
  }),
});

export const { useFetchNotifQuery, useIsNotifSeenMutation } =
  NotificationsApiSlice;
