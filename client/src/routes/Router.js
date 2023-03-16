import { Route, Routes } from "react-router-dom";
 import ForceRedirect from "./ForceRedirect";
import PrivateRoute from "./PrivateRoute";
import {Home, Login, NotFound, Profile,PostPage} from "../pages/index";


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
