import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//http://localhost:4000
export const baseQuery = fetchBaseQuery({
  baseUrl: "https://sang-store.onrender.com/",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Product", "User", "Comment", "Order"],
  endpoints: () => ({}),
});
