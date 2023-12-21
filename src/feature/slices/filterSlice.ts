import { createSlice } from "@reduxjs/toolkit";

type ProductsSlice = {
  category: string[];
  rating: number;
  priceMax: number;
  priceMin: number;
};

const data: ProductsSlice = {
  category: [],
  rating: 0,
  priceMax: 0,
  priceMin: 0,
};

const filterSlice = createSlice({
  name: "filter",
  initialState: data,
  reducers: {
    getCategory: (state, action) => {
      state.category = action.payload;
    },
    getRating: (state, action) => {
      state.rating = action.payload;
    },
    getPriceMax: (state, action) => {
      state.priceMax = action.payload;
    },
    getPriceMin: (state, action) => {
      state.priceMin = action.payload;
    },
    resetURL: (state) => {
      state.category = [];
      state.rating = 0;
      state.priceMax = 0;
      state.priceMin = 0;
    },
  },
});

export const { getCategory, getPriceMax, getPriceMin, getRating, resetURL } =
  filterSlice.actions;

export default filterSlice.reducer;
