import { Box, Button, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useState ,useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { setLogin, setUser } from '../features/userSlice'

interface props {
  isVisible: boolean
  closeModal: () => void
}

const Signout:React.FC<props> = ({
isVisible,
closeModal
}) => {
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

  const dispatch = useDispatch();
  const [animateDelete, setAnimateDelete] = useState(0);
  function closeModalHandler() {
    setAnimateDelete(animateDelete + 1);
    closeModal()
  }
  function signOutHandler(){
    dispatch(setLogin(false))
    dispatch(setUser({name:'', email:'',picture:''}))
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("user")
    closeModalHandler()
  }
  return (
    <AnimatePresence>
    {isVisible&&(
      <>
       <motion.div
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
       exit={{ opacity: 0 }}
       transition={{ duration: 0.2}}
     >
       <div
         onClick={closeModal}
         style={{
           backgroundColor: "rgba(0,0,0,0.5)",
           position: "fixed",
           top: 0,
           left: 0,
           zIndex: 1000,
           backdropFilter: "blur(5px)",
           width: "100%",
           height: "100%",
         }}
       />
     </motion.div>

    <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2}}
            >
      <Box
                sx={{
                  bgcolor: "background.paper",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  paddingX: "60px",
                  paddingY: "4rem",
                  zIndex: 2000,
                  border: "1px solid",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  width: windowWidth < 800 ? "100%" : "50rem",
                  height: "17rem",
                }}
              >
               <motion.div
            className="box"
            key={animateDelete}
            initial={{ opacity: 0.3, scale: 1, x: "50", y: "0" }}
            animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
            transition={{
              duration: 0.3,
              delay: 0.0,
              // ease: [0, 0.71, 0.2, 1.01],
            }}
                >
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{ marginBottom: "0.5rem" }}
                  >
                    Are you sure you want to Signout ?
                  </Typography>
                  
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.0,
                  }}
                  style={{
                    display: "flex",
                    marginTop: "3rem",
                  }}
                >
                  <Button
                    size="large"
                    sx={{
                      marginRight: "1.5rem",
                      marginLeft: "0.1rem",
                      paddingX: "1.5rem",
                      bgcolor: "rgba(255, 41, 55, 0.8)",
                      color: "white",
                      ":hover": { bgcolor: "rgba(255, 41, 55, 0.76)" },
                    }}
                    onClick={signOutHandler}
                  >
                    Yes
                  </Button>
                  <Button 
                    onClick={closeModalHandler}
                  size="large">
                    Cancel
                  </Button>
                </motion.div>
              </Box>
              </motion.div>
              </>
              )}
              </AnimatePresence>
  )
}

export default Signout
