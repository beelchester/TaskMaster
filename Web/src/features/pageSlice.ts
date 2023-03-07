import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PageState {
  currentPage: string;
}

const initialState: PageState = {
  currentPage: "Today",
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { changePage } = pageSlice.actions;

export default pageSlice.reducer;
