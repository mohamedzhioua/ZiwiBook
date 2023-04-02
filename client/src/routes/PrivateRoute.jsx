import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../layouts";
import { io } from "socket.io-client";
import { setOnlineUsers } from "../app/features/socket/socketSlice";
import { Loading, Notification } from "../components/index";
import { toast } from "react-toastify";
import notification from "../assets/sound/notification.wav"
export let socket;
function playNotificationSound() {
  const audio = new Audio(notification);
  audio.play();
}
function PrivateRoute() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      socket = io("http://localhost:5000");
      socket.emit("setup", {
        userId: user._id,
        info: {
          id: user._id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          photo: user.photo,
        },
      });
      socket.on("online_user", ({ type, info }) => {
        dispatch(setOnlineUsers({ type, info }));
      });
      socket.on("new_notification", ({ notification }) => {
        playNotificationSound();
        toast((t) => (
          <Notification t={t} toast={toast} notification={notification} />
        ));
      });
    }
  }, []);
  return token ? (
    <>
      <Header />
      <React.Suspense fallback={<Loading />}>
      <Outlet />
      </React.Suspense>
    </>
  ) : (

    <Navigate to="/login" replace />
  );
}
export default PrivateRoute;
