import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loading } from "../components";
import React from "react";

const ForceRedirect = ({ children }) => {
  const { token } = useSelector((state) => state.user);

  return token ? (
    <Navigate to="/" replace />
  ) : (
    <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
  );
};

export default ForceRedirect;
