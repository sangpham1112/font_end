import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ShippingAddress } from "../../types";

type OrderState = {
  shippingAddress: ShippingAddress;
  stepDone: number;
};

const address = localStorage.getItem("shippingAddress");
const initialState: OrderState = {
  shippingAddress: address
    ? JSON.parse(address)
    : {
        fullName: "",
        phone: "",
        address: "",
      },
  stepDone: 1,
};

export const currentOrderSlice = createSlice({
  name: "current_order",
  initialState,
  reducers: {
    handleContinute: (state, action: PayloadAction<ShippingAddress>) => {
      state.stepDone = 2;
      state.shippingAddress = { ...action.payload };
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
    handlePlaceOrder: (state) => {
      state.stepDone = 3;
    },
    resetProcess: (state) => {
      state.stepDone = 1;
      state.shippingAddress = {
        fullName: "",
        phone: "",
        address: "",
      };
    },
  },
});

export const { handleContinute, handlePlaceOrder, resetProcess } =
  currentOrderSlice.actions;

export default currentOrderSlice.reducer;
