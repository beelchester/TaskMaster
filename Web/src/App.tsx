/*global google*/
import { useEffect, useState } from "react";
import LeftDrawer from "./components/LeftDrawer";
import Page from "./components/Page";

import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserStart,
  fetchUserFailure,
  fetchUserSuccess,
} from "./features/fetchUserSlice";
import { useQuery, gql, useMutation } from "@apollo/client";
import { fetchProject } from "./features/projectSlice";
import { initialTasks } from "./features/taskSlice";
import { Button } from "@mui/material";
import { GET_USER } from "./graphql/Query";
import Login from "./components/Login";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.user.user);
  const projectsList = useSelector((state: any) => state.projects.projects);


  const tasks = useSelector((state: any) => state.tasks.tasks);

  const login = useSelector((state: any) => state.user.login);

  const page = useSelector((state: any) => state.page.currentPage);
  return (
    <>
      {!login ? (
        <Login />
      ) : (
        <Box sx={{ display: "flex" }}>
          <LeftDrawer />
          <Page />
        </Box>
      )}
    </>
  );
}
export default App;
