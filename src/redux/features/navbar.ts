import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const navbar = createSlice({
  name: "navbar",
  initialState: {
    value: "",
  },
  reducers: {
    setNavbar: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setNavbar } = navbar.actions;
export default navbar.reducer;
