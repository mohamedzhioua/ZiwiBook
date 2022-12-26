import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isloading, token, isConnected } = useSelector((state) => state.auth);

  if (isloading) return null;

  return isConnected || token ? children : <Navigate to="/login" replace />;
};
export default PrivateRoute;
