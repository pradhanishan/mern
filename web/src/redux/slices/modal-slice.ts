import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  link: string;
}

const initialState: IModalProps = {
  isOpen: false,
  content: "",
  title: "",
  link: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state: IModalProps, action: PayloadAction<IModalProps>): void => {
      state.isOpen = true;
      state.content = action.payload.content;
      state.title = action.payload.title;
      state.link = action.payload.link;
    },
    close: (state: IModalProps): void => {
      state.isOpen = false;
      state.content = "";
      state.title = "";
      state.link = "";
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice;
