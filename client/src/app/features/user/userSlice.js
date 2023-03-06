import { createSlice } from "@reduxjs/toolkit";
// import userService from "./userService";
// import Cookies from "js-cookie";

// const initialState = {
//   user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
//   token: Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null,
//   // error: null,
//   // message: "",
//   // status: "idle",
// };

// //Register user
// export const register = createAsyncThunk(
//   "auth/register",
//   async (user, thunkAPI) => {
//     try {
//       return await userService.register(user);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// //login user
// export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
//   try {
//     return await userService.login(user);
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });
// //logout user
// export const logout = createAsyncThunk("auth/logout", async () => {
//   await userService.logout();
// });

export const userSlice = createSlice({
  name: "user",
  initialState: { user: null, token: null },
  reducers: {
      setCredentials: (state, action) => {
          state.user = action.payload.user
          console.log("🚀 ~ file: userSlice.js:44 ~  action.payload:",  action.payload)
          state.token = action.payload.token
      },
      logOut: (state, action) => {
          state.user = null
          state.token = null
      }
  },
});

export const {  logOut, setCredentials } = userSlice.actions;
export default userSlice.reducer;
