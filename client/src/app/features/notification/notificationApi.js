import { apiSlice } from "../../api/apiSlice";

export const NotificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    FetchNotif: builder.query({
      query: () => `/notification/notifies`,
      providesTags: ["Notif"],
    }),

    addNotif: builder.mutation({
      query: (Credential) => ({
        url: `/notification/add`,
        method: "POST",
        body: Credential,
      }),
      invalidatesTags: ["Notif"],
    }),
  }),
});

export const { useFetchNotifQuery, useAddNotifMutation } =
  NotificationsApiSlice;
