import { apiSlice } from "../../api/apiSlice";
import { socket } from "../../../routes/PrivateRoute";

export const UserProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: (username) => `/users/getUserProfile/${username}`,
      providesTags: ["Userprofile"],
    }),

    FetchFriends: builder.query({
      query: () => `/friends/`,
      providesTags: ["Userprofile"],
    }),

    FriendFunc: builder.mutation({
      query: ({ id, type }) => ({
        url: `/friends/${type}/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Userprofile"],
      transformResponse: (responseData) => {
        const newNotification = responseData?.newNotif;
        if (newNotification) {
          socket.emit("notification", { notification: newNotification });
        }
      },
    }),
  }),
});

export const { useFetchUserProfileQuery, useFriendFuncMutation, useFetchFriendsQuery } =
  UserProfileApiSlice;
