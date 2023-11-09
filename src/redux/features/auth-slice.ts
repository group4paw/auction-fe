import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  user: any;
};

const initialState = {
  value: {
    user: null,
  },
};

export const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<AuthState>) => {
      state.value.user = action.payload.user;
    },
  },
});

export const { logOut, logIn } = auth.actions;
export default auth.reducer;
