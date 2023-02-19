import { configureStore } from "@reduxjs/toolkit";


import pageReducer from "../features/pageSlice";
import taskReducer from "../features/taskSlice";
import userReducer from "../features/userSlice";
import projectsReducer from "../features/projectSlice";

export const store = configureStore({
  reducer: {

    page : pageReducer,
    tasks : taskReducer,
    user : userReducer,
    projects : projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch