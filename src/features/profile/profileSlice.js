const { createSlice } = require("@reduxjs/toolkit");

const initialState = {};

const profileSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state = action?.payload;
    },
    userLoggedOut: (state) => {
      state = {};
    },
  },
});

export const { userLoggedIn, userLoggedOut } = profileSlice.actions;
export default profileSlice.reducer;
