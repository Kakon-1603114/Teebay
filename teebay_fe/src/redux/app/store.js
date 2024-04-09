import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../features/modal/modalSlice";

export default configureStore({
  reducer: {
    modals: modalReducer,
  },
});
