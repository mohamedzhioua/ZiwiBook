import React from "react";
import { Route, Routes } from "react-router-dom";
import ForceRedirect from "./ForceRedirect";
import PrivateRoute from "./PrivateRoute";
import { NotFound } from "../pages/index";
import Prefetch from "../app/features/auth/prefetch";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/login"));
const Profile = React.lazy(() => import("../pages/Profile"));
const PostPage = React.lazy(() => import("../pages/Post"));
const FriendsPage = React.lazy(() => import("../pages/friends"));

const Router = () => {
  return (
    <Routes>


      <Route element={<PrivateRoute />}>
        <Route
          path="/"
          element={
            <Home />
          }
        />
        <Route
          element={
            <Prefetch />
          }
        />
        <Route
          path="/profile/:username"
          element={
            <Profile />
          }
        />
        <Route
          path="/:username/posts/:id"
          element={
            <PostPage />
          }
        />
        <Route
          path="/friends/:type"
          element={
            <FriendsPage />
          }
        />
        <Route
          path="/friends"
          element={
            <FriendsPage />
          }
        />
      </Route>
      <Route element={<ForceRedirect />}>
        <Route
          path="/login"
          element={
            <Login />
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
