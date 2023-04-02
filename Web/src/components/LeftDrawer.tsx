import CssBaseline from "@mui/material/CssBaseline";
import { Drawer, IconButton, SwipeableDrawer, ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import DrawerContent from "./DrawerContent";
import {Menu} from "@mui/icons-material"

const drawerWidth = 240;

interface Props {
    iconZIndex: number;
}

const LeftDrawer: React.FC<Props> = ({ iconZIndex }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

        
const [drawerOpen, setDrawerOpen] = useState(false);

const [zIndex, setZIndex] = useState(0);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

  { windowWidth <900? ( <>
<IconButton onClick={()=>setDrawerOpen(true) }
   sx ={{
        position: "fixed",
        top: "10px",
        left: "16px",
        zIndex: iconZIndex, 
        color: "primary.main",
       }}
       >
<Menu sx={{height:'30px',width:'30px'}}/>
       </IconButton>
  <SwipeableDrawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "background.paper",
            color: "primary.main",
            zIndex: zIndex,
          },
        }}
        anchor="left"
        open={drawerOpen}
        onClose={()=>setDrawerOpen(false)}
        onOpen={()=>setDrawerOpen(true)}
      >
      <DrawerContent  setZIndex={setZIndex}
      />
      </SwipeableDrawer> </>):(
   <Drawer
        sx={{
          width: drawerWidth,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "background.paper",
            color: "primary.main",

            zIndex: zIndex,
          },
        }}
        variant="permanent"
        anchor="left"
      > 
      <DrawerContent setZIndex={setZIndex}/>
        </Drawer>
      ) }
    </ThemeProvider>
  );
}

export default LeftDrawer;
