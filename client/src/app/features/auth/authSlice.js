import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get token & user from localStorage
const token = JSON.parse(localStorage.getItem("token"));
const userInfo = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: null || userInfo,
  token: token ? token : null,
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

//updateCoverPhoto 
export const updateCoverPhoto = createAsyncThunk(
  "auth/updateCoverPhoto",
  async (data, thunkAPI) => {
    console.log("🚀 ~ file: authSlice.js:45 ~ data:", data)
    try {
      return await authService.updateCoverPhoto(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
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
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(updateCoverPhoto.pending, (state) => {
        state.status = "Loading";
        state.error = null;
      })
      .addCase(updateCoverPhoto.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "fulfilled";
      })
      .addCase(updateCoverPhoto.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "rejected";
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
