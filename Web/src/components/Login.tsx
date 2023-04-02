import { Box, ThemeProvider, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { theme } from "../theme";
import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLogin, setUser } from "../features/userSlice";
import { CREATE_USER } from "../graphql/UserMutation";
import { useMutation } from "@apollo/client";

const Login = () => {

  const dispatch = useDispatch();
  const [createUser] = useMutation(CREATE_USER);
  const handleCreateUser = async (user: any) => {
    createUser({
      variables: {
        email: user.email,
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "background.default",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "background.paper",
            height: "45rem",
            width: "40rem",
            padding: "4rem 60px",
            borderRadius: "1rem",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <motion.div style={{ textAlign: "center", cursor: "default" }}
           initial={{ opacity: 0.3, scale: 1, x: "0", y: "20" }}
           animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
           transition={{
             duration: 0.3,
             delay: 0.0,
             // ease: [0, 0.71, 0.2, 1.01],
           }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "white",
                fontWeight: "bold",
                display: "inline-block",
                marginRight: "11px",
              }}
            >
              Login to
            </Typography>
            <Typography
              variant="h3"
              sx={{
                color: "secondary.main",
                fontWeight: "bold",
                display: "inline-block",
              }}
            >
              TaskMaster
            </Typography>
          </motion.div>
          <Box sx={{
            marginTop: "2rem",
            height: "25rem",
            // bgcolor:"red",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <GoogleLogin
    size="large"
  onSuccess={credentialResponse => {
    if (credentialResponse.credential) {
      const decoded : any = jwt_decode(credentialResponse.credential);
      const user = {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };
      handleCreateUser(user);
      dispatch(setLogin(true))
      dispatch(setUser(user))
      localStorage.setItem("user", JSON.stringify(user));
    }
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
  </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Login;
