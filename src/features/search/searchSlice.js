import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  results: [],
  suggestions: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
  },
});

export const { setQuery, setResults, setSuggestions } = searchSlice.actions;
export default searchSlice.reducer;
