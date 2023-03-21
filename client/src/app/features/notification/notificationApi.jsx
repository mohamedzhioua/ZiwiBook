import { apiSlice } from "../../api/apiSlice";

export const NotificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FetchNotif: builder.query({
      query: () => `/notifications/notifies`,
      providesTags: ["Notif"],
    }),

    isNotifSeen: builder.mutation({
      query: (id) => ({
        url: `/notifications/isNotifSeen/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notif"],
    }),
  }),
});

export const { useFetchNotifQuery, useIsNotifSeenMutation } =
  NotificationsApiSlice;
