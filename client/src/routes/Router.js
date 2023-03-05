import { Route, Routes } from "react-router-dom";

 //Routes
 import ForceRedirect from "./ForceRedirect";
import PrivateRoute from "./PrivateRoute";

//Pages
import {Home, Login, NotFound, Profile, Register} from "../pages/index";


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
