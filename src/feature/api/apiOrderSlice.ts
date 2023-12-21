import {
  handleOrderData,
  Order,
  User,
  orderInput,
  updateOrderStatusType,
} from "../../types";
import { apiSlice } from "./index";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //GET ORDERS OF USER
    getUserOrders: builder.query<Order[], User>({
      query: (user) => ({
        url: `/api/orders/mine/${user._id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
      providesTags: [{ type: "Order" }],
    }),
    //create ORDER
    createOrder: builder.mutation<Order, orderInput>({
      query: (data) => ({
        url: `/api/orders`,
        method: "POST",
        body: {
          orderItems: data.orderItems,
          shippingAddress: data.shippingAddress,
          itemsPrice: data.itemsPrice,
          shippingPrice: data.shippingPrice,
          totalPrice: data.totalPrice,
          user: data.user,
        },
        headers: {
          Authorization: `Bearer ${data.user.token}`,
        },
      }),
      invalidatesTags: [{ type: "Order" }, { type: "Product" }],
    }),
    //DELETE ORDER
    deleteOrderById: builder.mutation<Order, handleOrderData>({
      query: (data) => ({
        url: `/api/orders/${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: [{ type: "Order" }],
    }),
    //PAY ORDER
    payOrder: builder.mutation<Order, handleOrderData>({
      query: (data) => ({
        url: `/api/orders/${data.id}/pay`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: [{ type: "Order" }],
    }),
    //get all orders
    getAllOrders: builder.query<Order[], string>({
      query: (token) => ({
        url: `/api/orders/`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [{ type: "Order" }],
    }),
    //update status for orders
    updateOrderStatus: builder.mutation<Order[], updateOrderStatusType>({
      query: (data) => ({
        url: `/api/orders/update-status`,
        method: "PUT",
        body: {
          orderCheckedBoxes: data.orderCheckedBoxes,
          status: data.status,
        },
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }),
      invalidatesTags: [{ type: "Order" }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useDeleteOrderByIdMutation,
  usePayOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApiSlice;
