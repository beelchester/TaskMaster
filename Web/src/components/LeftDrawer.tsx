import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {  Button, ThemeProvider } from '@mui/material';
import {theme} from '../theme';

import { changePage } from '../features/pageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useReducer, useState } from 'react';
import AddTask from '../modal/AddTask';
import AddProject from '../modal/AddProject';

const drawerWidth = 240;



export default function LeftDrawer() {
  const dispatch = useDispatch();
  const handleClickPage = (title:string) => {
    dispatch(changePage(title));
  }
  const projects = useSelector((state: any) => state.projects.projects);
  const [addProject, setAddProject] = useState(false);

  // const[zIndex, setZIndex] = useState(false);

  function closeModal(){
    setAddProject(!addProject);
    // setZIndex(false);
  }
  // console.log(projects)
  return (
    <ThemeProvider theme={theme}>
   
      <CssBaseline  />
      {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'background.paper',
            color: 'primary.main',
            
            zIndex: addProject ? 20 : 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h6"  component="p" 
        sx={{
          color:'secondary.main',
          fontWeight: 'bold',
          fontSize: '1.5rem',
          marginLeft: '1rem',
          marginTop: '2rem',
          cursor: 'default'
      }}>  
          TaskMaster
        </Typography>
        
        <List sx={{marginTop:'2rem',marginBottom:'1rem'}}>
          {['Today', 'Upcoming'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{paddingLeft:'0.4rem'}}>
              <ListItemButton sx={{paddingLeft:'1rem',':hover':{bgcolor:'rgba(0, 0, 0, 0.08)'}}} onClick={() => handleClickPage(text)}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon sx={{color:'primary.main',}}/> : <CalendarMonthIcon sx={{color:'primary.main'}} />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography variant="h6"  component="p" sx={{marginLeft:'1rem',marginTop:'1rem'}}>
          Projects
        </Typography>
        <List>
          {projects.map((project : any) => (
            <ListItem key={project.projectName} disablePadding sx={{marginLeft:'0.5rem'}}>
              <ListItemButton sx={{':hover':{bgcolor:'rgba(0, 0, 0, 0.08)'}}} onClick={() => handleClickPage(project.projectName)}>
                <ListItemText primary={project.projectName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Button onClick={()=>setAddProject(true)}>Add Project</Button>
        <AddProject isVisible={addProject} closeModal={closeModal}/>
       {/* <AddTask isVisible={addProject} mode="project" closeModal={closeModal}/> */}

      </Drawer>
     
    </ThemeProvider>
  );
}