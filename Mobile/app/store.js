import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/pageSlice";

export const store = configureStore({
  reducer: {
    page: pageReducer,
  },
});


