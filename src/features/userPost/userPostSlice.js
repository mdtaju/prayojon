import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchProductPost: [],
};

export const userPostSlice = createSlice({
  name: "userPost",
  initialState,
  reducers: {
    addProductPost: (state, action) => {
      state.searchProductPost = action.payload;
    },
  },
});

export const { addProductPost } = userPostSlice.actions;
export default userPostSlice.reducer;
