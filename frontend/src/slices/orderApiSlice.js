import { apiSlice } from "./apiSlice.js";
import { ORDERS_URL, PAYPAL_URL, STRIPE_URL } from "../constants.js";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: ORDERS_URL,
        method: "POST",
        body: { ...order }
      })
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}`
      }),
      keepUnusedDataFor: 5
    }),
    payOrder: builder.mutation({
      query: ({ orderId, details }) => ({
        url: `${ORDERS_URL}/${orderId}/pay`,
        method: "PUT",
        body: { ...details }
      })
    }),
    getPaypalClienId: builder.query({
      query: () => ({
        url: PAYPAL_URL
      }),
      keepUnusedDataFor: 5
    }),
    getStripeRedirectUrl: builder.mutation({
      query: (data) => ({
        url: STRIPE_URL,
        method: "POST",
        body: data
      })
    })
  })
});

export const {
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClienIdQuery,
  useGetStripeRedirectUrlMutation
} = orderApiSlice;
