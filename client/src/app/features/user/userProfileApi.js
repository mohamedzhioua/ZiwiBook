import { apiSlice } from "../../api/apiSlice";
import { socket } from "../../../routes/PrivateRoute";

export const UserProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchUserProfile: builder.query({
      query: (username) => `/user/getUserProfile/${username}`,
      providesTags: ["Userprofile"],
    }),
    FriendFunc: builder.mutation({
      query: ({ id, type }) => ({
        url: `/friend/${type}/${id}`,
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

export const { useFetchUserProfileQuery, useFriendFuncMutation } =
  UserProfileApiSlice;
