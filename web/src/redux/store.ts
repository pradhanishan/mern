import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import modalSlice from "./slices/modal-slice";
import requestSlice from "./slices/request-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    modal: modalSlice.reducer,
    request: requestSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
