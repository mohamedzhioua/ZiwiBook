import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  onlineUsers: [],
};
export const SocketSlice = createSlice({
  name: "socket",
  initialState,
  
  reducers: {
    setOnlineUsers: (state, action) => {
      const { type, info } = action.payload;
      if (
        type === "add" &&
        !state.onlineUsers.find((u) => u?.id === info?.id)
        ) {
        state.onlineUsers = [...state.onlineUsers, info];
      } else if (type === "remove") {
        state.onlineUsers = state.onlineUsers.filter((u) => u?.id !== info?.id);
      } else if (type === "connect") {
        state.onlineUsers = info;
      }
    },
  },
});
export const { setOnlineUsers } = SocketSlice.actions;

export default SocketSlice.reducer;
