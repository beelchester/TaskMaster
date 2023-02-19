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

const GET_USER = gql`
  query Query($email: String!) {
  getUser(email: $email) {
    email
    projects {
      projectName
      tasks {
        id
        text
        completed
        due
        priority
        project
        checked
      }
    }
  },
  getTasks(email: $email) {
    id
    text
    completed
    due
    priority
    project
    checked
}}
`;



function App() {
  const dispatch = useDispatch();
  // const [createTask, { loading, error }] = useMutation(GET_MUTATIONS);
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

  // const [createTask] = useMutation(GET_MUTATIONS);
  // const handleCreateTask = () => {
  //   createTask({
  //     variables: {
  //       email: 'sahil@sahil.com',
  //       projectName: 'Inbox',
  //       task: {
  //         "text": "aeee",
  //         "completed": false,
  //         "due": new Date().toISOString(),
  //         "priority": "P1",
  //         "project": "Inbox",
  //         "checked": false
  //       }
  //     },
  //     refetchQueries: [{ query: GET_USER, variables: { email: 'sahil@sahil.com' } }],
  //   }).then(()=>{
  //     fetchUser()
  //   })
  //   // console.log(createTask)
  //   // fetchUser()
  // };
  
  

  
    const tasks = useSelector((state: any) => state.tasks.tasks);
    // console.log(user)
   


  const page = useSelector((state: any) => state.page.currentPage);
  return (
    <Box sx={{display:'flex'}}>
      <LeftDrawer/>
    
      <Page />

      {/* <Button onClick={handleCreateTask}>hmmmm</Button>
      {tasks.map((task:any) => {
        return (
          <div>
            <h4>{task.text}</h4>
            <h4>{task.due}</h4>
          </div>
        )
      })
      } */}
      
    </Box>
  )
}
export default App
