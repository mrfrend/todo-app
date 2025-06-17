import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface ModalState {
  opened: boolean;
}

const initialState: ModalState = {
  opened: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.opened = true;
    },
    closeModal: (state) => {
      state.opened = false;
    },
  },
});

const selectModal = (state: RootState) => state.modal;

export const selectModalOpened = createSelector(
  [selectModal],
  ({ opened }) => opened
);
export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
