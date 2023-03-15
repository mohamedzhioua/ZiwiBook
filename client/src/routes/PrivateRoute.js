import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../layouts";
import { io } from "socket.io-client";
import { setOnlineUsers } from "../app/features/socket/socketSlice";

export let socket;

function PrivateRoute({ children }) {
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
    }
  }, []);
  return token ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
}
export default PrivateRoute;
