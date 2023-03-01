import { configureStore } from "@reduxjs/toolkit";


import pageReducer from "../features/pageSlice";
import taskReducer from "../features/taskSlice";
import fetchUserReducer from "../features/fetchUserSlice";
import projectsReducer from "../features/projectSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {

    page : pageReducer,
    tasks : taskReducer,
    fetchUser : fetchUserReducer,
    user : userReducer,
    projects : projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch