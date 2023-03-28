import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../features/pageSlice";
import fetchUserReducer from "../features/fetchUserSlice";
import taskReducer from "../features/taskSlice";
import projectReducer from "../features/projectSlice";
import userReducer from "../features/userSlice";
export const store = configureStore({
  reducer: {
    page: pageReducer,
    fetchUser: fetchUserReducer,
    tasks: taskReducer,
    project : projectReducer,
    user: userReducer
  },
});


