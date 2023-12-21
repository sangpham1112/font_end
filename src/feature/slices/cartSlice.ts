import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types";

type CartState = {
  cartItems: Product[];
  itemsPrice: number;
  amount: number;
  shippingFee: number;
};

const cartInfo = localStorage.getItem("cartInfo")
  ? JSON.parse(localStorage.getItem("cartInfo")!)
  : null;

const initialState: CartState = {
  cartItems: cartInfo ? cartInfo.cartItems : [],
  itemsPrice: cartInfo ? cartInfo.itemsPrice : 0,
  amount: cartInfo ? cartInfo.amount : 0,
  shippingFee: cartInfo ? cartInfo.shippingFee : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload;
      const existItem = state.cartItems.find(
        (item: Product) => item._id === newItem._id
      );

      state.cartItems = existItem
        ? state.cartItems.map((item: Product) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cartItems, newItem];
    },
    decrement: (state, action: PayloadAction<{ id: string }>) => {
      const currentCartItem = state.cartItems.find(
        (item) => item._id === action.payload.id
      );
      if (currentCartItem && currentCartItem.quantity) {
        currentCartItem.quantity > 1
          ? currentCartItem.quantity--
          : (state.cartItems = state.cartItems.filter(
              (item) => item._id !== action.payload.id
            ));
      }
    },
    increment: (
      state,
      action: PayloadAction<{ id: string; product: Product }>
    ) => {
      const { id, product } = action.payload;
      const currentCartItem = state.cartItems.find((item) => item._id === id);
      const quantity =
        currentCartItem && currentCartItem.quantity
          ? currentCartItem.quantity + 1
          : 1;

      if (product.countInStock < quantity) {
        alert("Sorry. Product is out of stock");
        return;
      }

      if (currentCartItem && currentCartItem.quantity) {
        currentCartItem.quantity++;
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const currentCartItems = state.cartItems.filter(
        (item) => item._id !== action.payload.id
      );
      state.cartItems = currentCartItems;
    },
    addAmount: (
      state,
      action: PayloadAction<{ id: string; amount: number; product: Product }>
    ) => {
      const { id, amount, product } = action.payload;
      const currentCartItem = state.cartItems.find((item) => item._id === id);

      if (!currentCartItem || currentCartItem.quantity === undefined) {
        return;
      }
      if (product.countInStock >= currentCartItem.quantity + amount) {
        currentCartItem.quantity = amount;
      } else {
        alert(
          "Số lượng sản phẩm trong giỏ hàng vượt quá số lượng còn lại trong kho."
        );
      }
    },
    removeAllCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.amount = 0;
      state.shippingFee = 0;
    },
    cartProceed: (state) => {
      const cartInfo = {
        cartItems: state.cartItems,
        itemsPrice: state.itemsPrice,
        amount: state.amount,
        shippingFee: state.shippingFee,
      };
      localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      let shippingFee = 0;
      state.cartItems.forEach((item) => {
        if (item.quantity) {
          amount += item.quantity;
          total += item.quantity * item.price;
          shippingFee += item.shippingPrice;
        }
      });
      state.amount = amount;
      state.itemsPrice = total;
      state.shippingFee = shippingFee;
    },
  },
});

export const {
  increment,
  decrement,
  addToCart,
  removeItem,
  calculateTotals,
  addAmount,
  cartProceed,
  removeAllCart,
} = cartSlice.actions;

export default cartSlice.reducer;
