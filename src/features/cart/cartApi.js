import { apiSlice } from "../api/apiSlice";
import {
  addCarts,
  cartColorSelection,
  cartItemRemove,
  cartQuantityUpdate,
} from "./cartSlice";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCartItem: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["getCartItems"],
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: result } = await queryFulfilled;
        } catch (error) {}
      },
    }),
    getCartItems: builder.query({
      query: (id) => `/cart/${id}`,
      providesTags: ["getCartItems"],
    }),
    cartItemsQuery: builder.mutation({
      query: (data) => ({
        url: "/cart_query",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: result } = await queryFulfilled;

          dispatch(addCarts(result));
        } catch (error) {}
      },
      providesTags: ["cartItemsQuery"],
    }),
    cartItemsQueryTwo: builder.query({
      query: (data) => {
        return {
          url: "/cart_remove",
          params: data,
        };
      },
    }),
    cartUpdateQuantity: builder.mutation({
      query: (data) => ({
        url: "/cart_quantity_update",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            cartQuantityUpdate({ id: arg.cart_id, quantity: arg.quantity })
          );
        } catch (error) {}
      },
      invalidatesTags: ["cartItemsQuery"],
    }),
    cartColorUpdate: builder.mutation({
      query: (data) => ({
        url: "/cart_color_update",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(cartColorSelection({ id: arg.cart_id, color: arg.color }));
        } catch (error) {}
      },
      invalidatesTags: ["cartItemsQuery"],
    }),
    cartRemove: builder.mutation({
      query: (data) => ({
        url: "/cart_remove",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(cartItemRemove(arg.id));
        } catch (error) {}
      },
      invalidatesTags: ["cartItemsQuery", "getCartItems"],
    }),
    addPayment: builder.mutation({
      query: (data) => ({
        url: "/payment",
        method: "POST",
        body: data,
      }),
    }),
    getUserOrders: builder.query({
      query: (id) => `/user_orders/${id}`,
    }),
    updateOrder: builder.mutation({
      query: (data) => ({
        url: "/manage_order",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: result } = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getUserOrders", arg?.id, (draft) => {
              Object.assign(draft, result?.order);
              // return draft.splice(result?.index, 1, result?.order);
            })
          );
        } catch (error) {}
      },
    }),
    addProductReview: builder.mutation({
      query: (data) => ({
        url: "/product_review",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddCartItemMutation,
  useGetCartItemsQuery,
  useCartItemsQueryMutation,
  useCartUpdateQuantityMutation,
  useCartItemsQueryTwoQuery,
  useCartRemoveMutation,
  useAddPaymentMutation,
  useGetUserOrdersQuery,
  useUpdateOrderMutation,
  useAddProductReviewMutation,
  useCartColorUpdateMutation,
  util: { getRunningQueriesThunk },
} = cartApi;
