import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import Cookies from "js-cookie";

const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  token: Cookies.get("token") ? JSON.parse(Cookies.get("token")) : null,
  error: null,
  message: "",
  status: "idle",
};

//Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

//login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
//logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.message = "";
      state.status = "idle";
    },
    updateCoverPhoto: (state, action) => {
      state.user.cover = action.payload;
      Cookies.set("user", JSON.stringify(state.user), {
        expires: 90,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.status = "fulfilled";
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.message = "";
        state.status = "rejected";
      })
      .addCase(login.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        state.status = "isConnected";
        Cookies.set("user", JSON.stringify(action.payload.user), {
          expires: 90,
        });
        Cookies.set("token", JSON.stringify(action.payload.token), {
          expires: 90,
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        Cookies.set("user", null);
        Cookies.set("token", null);
      });
  },
});

export const { reset, updateCoverPhoto } = authSlice.actions;
export default authSlice.reducer;
