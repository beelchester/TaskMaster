import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Box, Button, IconButton} from "@mui/material";
import { MoreVert, Logout } from "@mui/icons-material";
import { changePage } from "../features/pageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import AddProject from "../modal/AddProject";
import { useQuery } from "@apollo/client";
import { fetchUserFailure, fetchUserStart, fetchUserSuccess } from "../features/fetchUserSlice";
import { fetchProject } from "../features/projectSlice";
import { initialTasks } from "../features/taskSlice";
import { GET_USER } from '../graphql/Query';
import Signout from "../modal/Signout";

interface DrawerContentProps {
    setZIndex: (zIndex: number) => void;
}

const DrawerContent:React.FC<DrawerContentProps> = ({setZIndex}) => {



const currentUser = useSelector((state: any) => state.user.user);
  const user = useQuery(GET_USER, {
    variables: { email: currentUser.email },
  });

  useEffect(() => {
    fetchUser();
  }, [user]);

  const fetchUser = () => {
    if (user.loading) {
      dispatch(fetchUserStart());
    }
    if (user.error) {
      dispatch(fetchUserFailure(user.error));
      return
    }
    if (user.data) {
      dispatch(fetchUserSuccess(user.data.getUser.user));
      dispatch(fetchProject(user.data.getUser.user.projects));
      dispatch(initialTasks(user.data.getTasks));
    localStorage.setItem("accessToken", user.data.getUser.accessToken);
    localStorage.setItem("refreshToken", user.data.getUser.refreshToken);
    }
  };
  const dispatch = useDispatch();
  const handleClickPage = (title: string) => {
    dispatch(changePage(title));
  };
  const projects = useSelector((state: any) => state.projects.projects);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const[signOutModalVisible,setSignOutModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [hoveredIndex1, setHoveredIndex1] = useState(null);
  const [hoveredIndex2, setHoveredIndex2] = useState(null);

  const [editProjectMenu, setEditProjectMenu] = useState(null);
  function closeAddModal() {
    setAddModalVisible(false);
  }
  function closeEditModal() {
    setEditModalVisible(false);
  }
  function closeDeleteModal() {
    setDeleteModalVisible(false);
  }


  const [selectProject, setSelectProject] = useState(null);

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
    
    useEffect(() => {
       if (addModalVisible || editModalVisible || deleteModalVisible || signOutModalVisible ) {
            setZIndex(20)
           }
           else{
                setZIndex(0)
               }
    }, [addModalVisible, editModalVisible, deleteModalVisible, signOutModalVisible])

  return (
        <Box sx={{ height:'100vh',display:"flex",flexDirection:'column',justifyContent:'space-between'}}>
        <Box>
        <Typography
          variant="h6"
          sx={{
            color: "secondary.main",
            fontWeight: "bold",
            fontSize: "1.5rem",
            marginLeft: "1rem",
            marginTop: "2rem",
            cursor: "default",
          }}
        >
          TaskMaster
        </Typography>

        <List sx={{ marginTop: "2rem", marginBottom: "1rem" }}>
          {["Today", "Upcoming"].map((text, index:any) => {
            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onMouseEnter={() => setHoveredIndex1(index)}
                  onMouseLeave={() => setHoveredIndex1(null)}
                  sx={{
                    paddingLeft: "1.4rem",
                    ":hover": { bgcolor: "rgba(0, 0, 0, 0.1)" },
                  }}
                  onClick={() => handleClickPage(text)}
                >
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <InboxIcon sx={{ color: "primary.main" }} />
                    ) : (
                      <CalendarMonthIcon sx={{ color: "primary.main" }} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Typography
          variant="h6"
          component="p"
          sx={{ marginLeft: "1rem", marginTop: "1rem" }}
        >
          Projects
        </Typography>
        <List>
          {projects.map((project: any, index : any) => {
            const isHovered = hoveredIndex2 === index;
            const isClicked = editProjectMenu === index;
            return (
              <ListItem key={project.projectName} disablePadding>
                <ListItemButton
                  disableRipple={isClicked}
                  onMouseEnter={() => {
                    !isClicked && setHoveredIndex2(index);
                  }}
                  onMouseLeave={() => {
                    !isClicked && setHoveredIndex2(null);
                  }}
                  sx={{
                    paddingLeft: "1.4rem",
                    ":hover": { bgcolor: "rgba(0, 0, 0, 0.1)" },
                  }}
                  onClick={() => handleClickPage(project.projectName)}
                >
                  <ListItemText
                    sx={{ position: "relative", zIndex: 10 }}
                    primary={project.projectName}
                  />
                  {isHovered && index !== 0 && (
                    <IconButton
                      sx={{ color: "primary.main", padding: "4px" }}
                      onClick={() => {
                        setEditProjectMenu(index);
                        setSelectProject(project);
                      }}
                    >
                      <MoreVert sx={{ color: "primary.main" }} />
                    </IconButton>
                  )}
                  {isClicked && (
                    <ListItem
                      onMouseEnter={() => {
                        setHoveredIndex2(index);
                      }}
                      ref={refOne}
                      sx={{
                        position: "absolute",
                        bottom: "-90px",
                        right: "10px",
                        display: "flex",
                        flexDirection: "column",
                        zIndex: 999,
                        bgcolor: "rgb(20, 20, 20)",
                        width: "6rem",
                        padding: "0px",
                      }}
                    >
                      <ListItemButton
                        onClick={() => {
                          setEditModalVisible(true);
                          setTimeout(() => {
                            setEditProjectMenu(null);
                            setHoveredIndex2(null);
                          } , 200)
                        }}
                        sx={{
                          width: "100%",
                          ":hover": { bgcolor: "rgba(0, 0, 0, 0.3)" },
                        }}
                      >
                        <ListItemText primary="Edit" />
                      </ListItemButton>
                      <ListItemButton
                        onClick={() => {
                          setDeleteModalVisible(true);
                          setTimeout(() => {
                            setEditProjectMenu(null);
                            setHoveredIndex2(null);
                          } , 200)
                        }}
                        sx={{
                          width: "100%",
                          ":hover": { bgcolor: "rgba(0, 0, 0, 0.3)" },
                        }}
                      >
                        <ListItemText primary="Delete" />
                      </ListItemButton>
                    </ListItem>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        </Box>
        <Box>
        <Button sx={{width:"100%",margin:'0.5rem 0px'}} onClick={() => setAddModalVisible(true)}>Add Project</Button>
        <AddProject isVisible={addModalVisible} closeModal={closeAddModal} />
        <AddProject
          toEditProject={selectProject}
          mode="edit"
          closeModal={closeEditModal}
          isVisible={editModalVisible}
        />
        <AddProject
          toEditProject={selectProject}
          mode="delete"
          closeModal={closeDeleteModal}
          isVisible={deleteModalVisible}
        />
        <Signout isVisible={signOutModalVisible} closeModal={()=>setSignOutModalVisible(false)}/>
        <Box sx={{padding:'0.8rem',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <Box sx={{display:'flex',alignItems:'center'}}>
          <img src={currentUser.picture} style={{borderRadius:"50%", width:"2.7rem"}}/>
          <Typography sx={{fontWeight:'bold',marginLeft:'12px',cursor:'default'}}>{currentUser.name}</Typography>
          </Box>
          <IconButton onClick={()=>setSignOutModalVisible(true)} sx={{padding:'0px'}} >
            <Logout sx={{color:'white', width:'20px'}}/>
          </IconButton>
        </Box>
        </Box>
        </Box>
  )
}

export default DrawerContent
