import { createSlice } from "@reduxjs/toolkit";

interface IRequestProps {
  counter: number;
}

const initialState: IRequestProps = {
  counter: 0,
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    increase: (state: IRequestProps): void => {
      state.counter += 1;
    },
  },
});

export const requestActions = requestSlice.actions;

export default requestSlice;
