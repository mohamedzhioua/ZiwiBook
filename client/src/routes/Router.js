import React from "react";
import { Route, Routes } from "react-router-dom";
import ForceRedirect from "./ForceRedirect";
import PrivateRoute from "./PrivateRoute";
import {NotFound} from "../pages/index";
const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/login"));
const Profile = React.lazy(() => import("../pages/Profile"));
const PostPage = React.lazy(() => import("../pages/Post"));

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile/:username"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/:username/posts/:id"
        element={
          <PrivateRoute>
            <PostPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ForceRedirect>
            <Login />
          </ForceRedirect>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
