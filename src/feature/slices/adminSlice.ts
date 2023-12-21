import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types";

export type adminHandleType = {
  addProductModalOpen: boolean;
  deleteProductModalOpen: boolean;
  id: string;
  image: string;
  previewModalOpen: boolean;
  currentPreview: Product[] | null;
  orderCheckedBoxes: string[] | null;
};

const initialAdminState: adminHandleType = {
  addProductModalOpen: false,
  deleteProductModalOpen: false,
  id: "",
  image: "",
  previewModalOpen: false,
  currentPreview: null,
  orderCheckedBoxes: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: initialAdminState,
  reducers: {
    OpenAddProudctModal: (state) => {
      state.addProductModalOpen = true;
    },
    CloseAddProudctModal: (state) => {
      state.addProductModalOpen = false;
    },
    OpenDeleteProudctModal: (state) => {
      state.deleteProductModalOpen = true;
    },
    CloseDeleteProudctModal: (state) => {
      state.deleteProductModalOpen = false;
    },
    getChosenProductId: (state, action) => {
      state.id = action.payload;
    },
    getImage: (state, action) => {
      state.image = action.payload;
    },
    OpenPreviewModal: (state) => {
      state.previewModalOpen = true;
    },
    ClosePreviewModal: (state) => {
      state.previewModalOpen = false;
    },
    GetCurrentReview: (state, action) => {
      state.currentPreview = action.payload;
    },
    GetOrderCheckedBoxes: (state, action) => {
      state.orderCheckedBoxes = action.payload;
    },
  },
});

export const {
  OpenAddProudctModal,
  CloseAddProudctModal,
  OpenDeleteProudctModal,
  CloseDeleteProudctModal,
  getChosenProductId,
  getImage,
  OpenPreviewModal,
  ClosePreviewModal,
  GetCurrentReview,
  GetOrderCheckedBoxes,
} = adminSlice.actions;

export default adminSlice.reducer;
