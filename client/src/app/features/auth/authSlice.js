import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get token from localStorage
const token = JSON.parse(localStorage.getItem('token'))
const initialState = {
  user: "",
 token: token ,
  error: "",
  message: "",
  isConnected: false,
  isLoading: false,
};

//Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      return await authService.register(user);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//login user
export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = "";
      state.token = "";
      state.error = "";
      state.message = "";
      state.isConnected = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.error = "";
        state.message = action.payload.message;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = "";
        state.error = action.payload;
        state.message = "";
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
         state.error = "";
        state.message = action.payload.message;
        state.isConnected = true;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = "";
        state.error = action.payload;
        state.message = "";
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = "";
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
