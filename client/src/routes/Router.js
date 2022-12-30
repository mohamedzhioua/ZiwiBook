import { Route, Routes } from "react-router-dom";
 import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import NotFound from "../pages/404/NotFound ";
import ForceRedirect from "./ForceRedirect";
import PrivateRoute  from "./PrivateRoute";
import Profile from "../pages/Profile/Profile";
import Feed from "../pages/Feed/Feed";
import EditMemo from "../pages/EditMemorie/EditMemo";

const Router =()=> {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Feed />
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
       <Route
      path="/edit/:id"
      element={
        <PrivateRoute>
          <EditMemo />
        </PrivateRoute>
      }
    />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
