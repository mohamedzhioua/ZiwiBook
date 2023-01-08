import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  componentName: null,
  childrenProps: {},
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.componentName = action.payload.name;
      state.childrenProps = action.payload.childrenProps;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
      state.componentName = null;
      state.childrenProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
