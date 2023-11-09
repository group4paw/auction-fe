import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import navbarReducer from "./features/navbar";
import auctionReducer from "./features/auction";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navbar: navbarReducer,
    auction: auctionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
