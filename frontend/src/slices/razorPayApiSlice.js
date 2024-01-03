import { RAZORPAY_URL } from "../constants";
import { apiSlice } from "./apiSlice.js";

const razorPayApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRazorPayKey: builder.query({
      query: () => ({
        url: `${RAZORPAY_URL}/key`
      }),
      keepUnusedDataFor: 5
    }),
    createRazorPayOrder: builder.mutation({
      query: (data) => ({
        url: `${RAZORPAY_URL}/order`,
        method: "POST",
        body: data
      })
    })
  })
});

export const { useGetRazorPayKeyQuery, useCreateRazorPayOrderMutation } =
  razorPayApiSlice;
