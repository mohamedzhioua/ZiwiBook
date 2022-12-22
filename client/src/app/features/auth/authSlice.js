import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
const initialState = {
  user: null,
  error: "",
  isConnected: false,
};

//Register user 
export const register = createAsyncThunk('auth/register',async(user , { rejectWithValue })=>{
  try {
    return await authService.register(user)
  } catch (error) {
    return rejectWithValue(error.response.data);

  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(register.pending,(state,action)=>{
      state.user = null
    })
    .addCase(register.fulfilled,(state,action)=>{
      state.error=""
      state.user=action.payload
      state.isConnected=true
    })
    .addCase(register.rejected,(state,action)=>{
      state.error=action.payload 
      state.user=null
    })

  },
});

export default authSlice.reducer;
