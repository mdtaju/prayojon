import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCarts: (state, action) => {
      state.cart = action.payload;
    },
    cartQuantityUpdate: (state, action) => {
      const getItem = state?.cart?.find(
        (item) => item.cart_id == action.payload.id
      );
      getItem.quantity = action.payload.quantity;
    },
    cartItemRemove: (state, action) => {
      for (let i = 0; i < state.cart.length; ) {
        const element = state.cart[i];
        if (element.cart_id == action.payload) {
          state.cart.splice(i, 1);
        }
        i++;
      }
    },
  },
});

export const { addCarts, cartQuantityUpdate, cartItemRemove } =
  cartSlice.actions;
export default cartSlice.reducer;
