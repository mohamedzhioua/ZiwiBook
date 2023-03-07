import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  token: Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      Cookies.set("user", JSON.stringify(action.payload.user), {
        expires: 90,
      });
      Cookies.set("token", JSON.stringify(action.payload.token), {
        expires: 90,
      });
    },
    UpdateCover: (state, action) => {
      state.user.cover = action.payload;
      Cookies.set("user", JSON.stringify(state.user), {
        expires: 90,
      });
    },
    Updatephoto: (state, action) => {
      state.user.photo = action.payload;
      Cookies.set("user", JSON.stringify(state.user), {
        expires: 90,
      });
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
      Cookies.set("user", null);
      Cookies.set("token", null);
    },
  },
});

export const { logOut, setCredentials, UpdateCover, Updatephoto } =
  userSlice.actions;
export default userSlice.reducer;
