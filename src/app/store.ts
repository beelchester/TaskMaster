import { configureStore } from "@reduxjs/toolkit";


import pageReducer from "../features/pageSlice";
import taskReducer from "../features/taskSlice";

export const store = configureStore({
  reducer: {

    page : pageReducer,
    tasks : taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch