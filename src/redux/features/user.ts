import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: UserInfomationState;
};

type UserInfomationState = {
  wishList: 0;
  cart: 0;
  activity: 0;
};

const initialState = {
  value: {
    wishList: 0,
    cart: 0,
    activity: 0,
  },
};

export const userInfo = createSlice({
  name: "userInfo",
  initialState: initialState,
  reducers: {
    setInformation: (state, action: PayloadAction<UserInfomationState>) => {
      state.value.wishList = action.payload.wishList;
      state.value.cart = action.payload.cart;
      state.value.activity = action.payload.activity;
    },
  },
});

export const { setInformation } = userInfo.actions;
export default userInfo.reducer;
