import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  componentName: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.componentName = action.payload;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
      state.componentName = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
