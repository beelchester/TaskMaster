import { useEffect, useState } from 'react'
import LeftDrawer from './components/LeftDrawer'
import Page from './components/Page'

import Box from '@mui/material/Box';

import { useDispatch, useSelector } from 'react-redux';
import { fetchUserStart, fetchUserFailure, fetchUserSuccess } from './features/userSlice';
import { useQuery, gql, useMutation } from '@apollo/client';
import { fetchProject } from './features/projectSlice';
import { initialTasks } from './features/taskSlice';
import { Button } from '@mui/material';
import { GET_USER } from './graphql/Query';


function App() {
  const dispatch = useDispatch();
    const projectsList = useSelector((state: any) => state.projects.projects);
    const user = useQuery(GET_USER, {
      variables: { email: "sahil@sahil.com" },
    });
   
    useEffect (() => {
      fetchUser()
    }, [user])
    
    const fetchUser = () => {
      
      if (user.loading) {
        dispatch(fetchUserStart());
        
      }
      if (user.error) {
        dispatch(fetchUserFailure(user.error));
      }
      if (user.data) {
        dispatch(fetchUserSuccess(user.data.getUser));
        dispatch(fetchProject(user.data.getUser.projects));
        dispatch(initialTasks(user.data.getTasks));
      }
    }


  
  

  
    const tasks = useSelector((state: any) => state.tasks.tasks);
   


  const page = useSelector((state: any) => state.page.currentPage);
  return (
    <Box sx={{display:'flex'}}>
      <LeftDrawer/>
    
      <Page />


      
    </Box>
  )
}
export default App
