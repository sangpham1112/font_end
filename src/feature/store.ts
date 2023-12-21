import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import { apiSlice } from "./api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import userSlice from "./slices/userSlice";
import currentOrderSlice from "./slices/currentOrderSlice";
import filterSlice from "./slices/filterSlice";
import adminSlice from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
    currentOrder: currentOrderSlice,
    filter: filterSlice,
    admin: adminSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
