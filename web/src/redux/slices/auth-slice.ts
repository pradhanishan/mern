import { createSlice } from "@reduxjs/toolkit";

const initialState: { isLoggedIn: boolean } = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true" ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
    },
    login: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
