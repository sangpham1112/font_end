import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000",
  credentials: "include",
});

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ["Product", "User", "Comment", "Order"],
  endpoints: () => ({}),
});
