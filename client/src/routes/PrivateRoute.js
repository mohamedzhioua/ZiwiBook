import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const {status, token} = useSelector((state) => state.auth);

  // if (isloading) return null;

  return status==="isConnected" || token ? children : <Navigate to="/login" replace />;
};
export default PrivateRoute;
