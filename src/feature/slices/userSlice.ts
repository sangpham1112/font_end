import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

type userType = {
  user: User | null;
};

const currentUser = localStorage.getItem("user");

const initialState: userType = {
  user: currentUser ? JSON.parse(currentUser) : null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoggingUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    UserLogOut: (state) => {
      state.user = null;
      localStorage.setItem("user", JSON.stringify(null));
      localStorage.setItem("cartInfo", JSON.stringify(null));
      localStorage.setItem("shippingAddress", JSON.stringify(null));
    },
  },
});

export const { LoggingUser, UserLogOut } = userSlice.actions;

export default userSlice.reducer;
