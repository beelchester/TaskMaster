import CssBaseline from "@mui/material/CssBaseline";
import { Button, Drawer, IconButton, SwipeableDrawer, ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { useDispatch} from "react-redux";
import { useEffect, useRef, useState } from "react";
import DrawerContent from "./DrawerContent";
import {Menu} from "@mui/icons-material"

const drawerWidth = 240;

export default function LeftDrawer() {
  const dispatch = useDispatch();
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const[signOutModalVisible,setSignOutModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [hoveredIndex1, setHoveredIndex1] = useState(null);
  const [hoveredIndex2, setHoveredIndex2] = useState(null);

  const [editProjectMenu, setEditProjectMenu] = useState(null);



  const refOne = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event : any) {
      if (refOne.current && !refOne.current.contains(event.target)) {
        setEditProjectMenu(null);
        setHoveredIndex2(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refOne]);

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    console.log(windowWidth)
        
const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

  { windowWidth <900? ( <>
<IconButton onClick={()=>setDrawerOpen(true) }
   sx ={{
        position: "fixed",
        top: "10px",
        left: "16px",
        zIndex: 100,
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

            zIndex:
              addModalVisible || editModalVisible || deleteModalVisible || signOutModalVisible
                ? 20
                : 0,
          },
        }}
        anchor="left"
        open={drawerOpen}
        onClose={()=>setDrawerOpen(false)}
        onOpen={()=>setDrawerOpen(true)}
      >
      <DrawerContent/>
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

            zIndex:
              addModalVisible || editModalVisible || deleteModalVisible || signOutModalVisible
                ? 20
                : 0,
          },
        }}
        variant="permanent"
        anchor="left"
      > 
      <DrawerContent/>
        </Drawer>
      ) }
    </ThemeProvider>
  );
}
