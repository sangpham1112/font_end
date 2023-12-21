import { Product } from "../../types";
import { initialState } from "../../utils/useUpdateFormHook";
import { apiSlice } from "./index";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], string>({
      query: (query) => ({
        url: `/api/products/${query}`,
        method: "GET",
      }),
      providesTags: [{ type: "Product", id: "LIST" }],
    }),
    getProduct: builder.query<Product, string>({
      query: (slug) => `/api/products/slug/${slug}`,
      providesTags: [{ type: "Product" }, { type: "Comment" }],
    }),
    getProductBySearch: builder.query<Product[], string>({
      query: (query) => `/api/products/search/${query}`,
      providesTags: [{ type: "Product" }],
    }),
    getCategoryFromProducts: builder.query<string[], void>({
      query: () => `/api/products/categories`,
      providesTags: [{ type: "Product" }],
    }),
    createProduct: builder.mutation<Product, initialState>({
      query: (data) => ({
        url: `/api/products/`,
        method: "POST",
        body: {
          name: data.name,
          category: data.category,
          brand: data.brand,
          slug: data.slug,
          price: data.price,
          previousPrice: data.previousPrice,
          shippingPrice: data.shippingPrice,
          description: data.description,
          image: data.image,
          countInStock: data.countInStock,
        },
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: [{ type: "Product" }],
    }),
    updateProduct: builder.mutation<Product, initialState>({
      query: (data) => ({
        url: `/api/products/${data.slug}`,
        method: "PUT",
        body: {
          name: data.name,
          category: data.category,
          brand: data.brand,
          slug: data.slug,
          price: data.price,
          previousPrice: data.previousPrice,
          shippingPrice: data.shippingPrice,
          description: data.description,
          image: data.image,
          countInStock: data.countInStock,
        },
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: [{ type: "Product" }],
    }),
    deleteProduct: builder.mutation<Product, initialState>({
      query: (data) => ({
        url: `/api/products/delete/${data._id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: [{ type: "Product" }],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductsQuery,
  useGetProductBySearchQuery,
  useGetCategoryFromProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
