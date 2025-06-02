import { createSlice } from "@reduxjs/toolkit";

interface InputState {
  value: string;
  page?: number;
}

const initialState: InputState = {
  value: "",
  page: 1,
};

// This file defines a Redux slice for managing the search input value and pagination state in the application.
// It includes actions to set the input value, increment and decrement the page number.
// The initial state includes an empty string for the input value and a page number starting at 1.

const inputSlice = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      state.value = action.payload;
      state.page = 1; // Reset page to 1 whenever a new search is made
    },
    incrementPage: (state) => {
      if (state.page !== undefined) {
        state.page += 1; // Increment page number for pagination
      }
    },
    decrementPage: (state) => {
      if (state.page !== undefined && state.page > 1) {
        state.page -= 1; // Decrement page number, ensuring it doesn't go below 1
      }
    }
  }});

export const { setInputValue, incrementPage,decrementPage } = inputSlice.actions;
export default inputSlice.reducer;  
