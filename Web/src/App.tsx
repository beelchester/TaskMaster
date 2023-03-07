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
import { getRefreshToken, isAuthenticated, refreshToken} from "./auth";
import { setLogin } from "./features/userSlice";

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.user.user);
  const projectsList = useSelector((state: any) => state.projects.projects);

  const tasks = useSelector((state: any) => state.tasks.tasks);

  const login = useSelector((state: any) => state.user.login);

  const page = useSelector((state: any) => state.page.currentPage);
  isAuthenticated()
  useEffect(() => {
  if(!isAuthenticated()){
    dispatch(setLogin(false));
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  }
  },[isAuthenticated(), page]);
  // useEffect(() => {
  //   console.log("jhi")
    // refreshTokenIfExpired(); 
  // }, [isAuthenticated(), page]);
  //    const REFRESH = gql`
  //   query Query($email: String!, $refreshToken: String) {
  //     refresh(email: $email, refreshToken: $refreshToken) {
  //       accessToken
  //     }
  //   }
  //   `;

  async function refreshTokenIfExpired(){
    console.log("hm")
    // if(!getRefreshToken()){
    //   dispatch(setLogin(false));
    //   return
    // }
    // if(!isAuthenticated()){
    //   try{
    //     console.log("firstkjbk")
     
    // const user = useQuery(REFRESH, {
    //   variables: { email : currentUser.email,refreshToken : getRefreshToken() },
    // });
    // const {accessToken} = user.data.refresh;
    // console.log(accessToken)
    //     localStorage.setItem("accessToken", accessToken);
    //     dispatch(setLogin(true));
    //   }
    //   catch(err){
    //     // console.log(err)
    //     dispatch(setLogin(false));
    //   }
    // }
  }

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
