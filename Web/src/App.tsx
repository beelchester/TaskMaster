/*global google*/
import { useEffect, useState } from "react";
import LeftDrawer from "./components/LeftDrawer";
import Page from "./components/Page";

import Box from "@mui/material/Box";

import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import {isAuthenticated} from "./auth";
import {setLogin} from "./features/userSlice";
import Loading from "./modal/Loading";

function App() {
    const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
  }, []);

    useEffect(() => {
        if (isMobile) {
            alert("Please use TaskMaster mobile app for better experience");
        }
    }, [isMobile]);


  const dispatch = useDispatch();

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

  // async function refreshTokenIfExpired(){
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
  // }


  return (
    <>
      {!login ? (
        <Login />
      ) : (
        <Box sx={{ display: "flex" }}>
        <Loading />
          <LeftDrawer />
          <Page />
        </Box>
      )}
    </>
  );
}
export default App;
