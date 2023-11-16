import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  user: any;
  role: string;
};

const initialState = {
  value: {
    user: null,
    role: "",
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
      state.value.role = action.payload.role;
    },
  },
});

export const { logOut, logIn } = auth.actions;
export default auth.reducer;
