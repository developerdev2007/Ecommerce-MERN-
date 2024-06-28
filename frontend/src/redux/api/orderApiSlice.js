import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice.js";
import { ORDER_URL } from "../constants.js";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDER_URL,
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
      }),
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDER_URL}/${orderId}/pay`,
        method: "PUT",
        body: details,
      }),
    }),
    /* !!!code For paypal that i skipped
     *(https://youtu.be/cbLD1GTXzto?si=0c046fNvSxsoVOof)
     */
    getOrders: builder.query({
      query: () => ORDER_URL,
    }),
    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDER_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),
    getTotalOrders: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-orders`,
      }),
    }),
    getTotalSales: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales`,
      }),
    }),
    getTotalSalesByDate: builder.query({
      query: () => ({
        url: `${ORDER_URL}/total-sales-by-date`,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useDeliverOrderMutation,
  usePayOrderMutation,
  useGetOrdersQuery,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} = orderApiSlice;
