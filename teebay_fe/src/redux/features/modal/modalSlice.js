import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modals",
  initialState: {
    confirmationModal: {
      isOpen: false,
      message: null,
      confirmed: false,
      from: null,
    },
    successModal: {
      isOpen: false,
      message: null,
    },
    rentModal: {
      isOpen: false,
    },
  },
  reducers: {
    setConfirmationModal: (state, action) => {
      state.confirmationModal = action.payload;
    },
    closeConfirmationModal: (state) => {
      state.confirmationModal = {
        isOpen: false,
        message: null,
        confirmed: false,
        from: null,
      };
    },
    setSuccessModal: (state, action) => {
      state.successModal = action.payload;
    },
    setRentModal: (state, action) => {
      state.rentModal.isOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSuccessModal,
  setConfirmationModal,
  closeConfirmationModal,
  setRentModal,
} = modalSlice.actions;

export default modalSlice.reducer;
