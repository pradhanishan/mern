import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
