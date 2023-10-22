import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { apiSlice } from "../features/api/apiSlice";
import cartSlice from "../features/cart/cartSlice";
import profileSlice from "../features/profile/profileSlice";
import searchSlice from "../features/search/searchSlice";
import userPostSlice from "../features/userPost/userPostSlice";

export const store = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: profileSlice,
      cart: cartSlice,
      userPost: userPostSlice,
      search: searchSlice,
    },
    devTools: false,
    middleware: (getDefaultMiddleWares) =>
      getDefaultMiddleWares().concat(apiSlice.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: false });

// export const wrapper = createWrapper(store);
