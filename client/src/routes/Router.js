import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import NotFound from "../pages/404/NotFound ";
import ForceRedirect from "./ForceRedirect";
import PrivateRoute  from "./PrivateRoute";
import Profile from "../pages/Profile/Profile";

const Router =()=> {
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
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
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
      <Route
        path="/Signup"
        element={
          <ForceRedirect>
            <Signup />
          </ForceRedirect>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
