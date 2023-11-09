import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const auction = createSlice({
  name: "auction",
  initialState: {
    data: "",
  },
  reducers: {
    setAuction: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
});

export const { setAuction } = auction.actions;
export default auction.reducer;
