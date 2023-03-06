import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Header } from "../layouts";

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.user);

  return token ? (
    <>
      <Header />
      {children}
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
export default PrivateRoute;
