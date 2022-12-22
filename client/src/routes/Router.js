import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import NotFound from "../pages/404/NotFound ";
import ForceRedirect from "./ForceRedirect";
import { PrivateRoute } from "./PrivateRoute";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
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
