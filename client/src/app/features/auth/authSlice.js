import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  user: null,
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

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.error = "";
      state.message = "";
      state.isConnected = false;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.error = "";
        state.message = action.payload.message;
        state.isConnected = true;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
        state.message = "";
        state.isConnected = false;
        state.isLoading = false;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
