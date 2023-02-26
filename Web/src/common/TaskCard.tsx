import { gql, useMutation, useQuery } from "@apollo/client";
import { ListItem, Checkbox, ListItemText, Paper, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../features/projectSlice";
import { initialTasks } from "../features/taskSlice";
import { fetchUserFailure, fetchUserStart, fetchUserSuccess } from "../features/userSlice";
import AddTask from "../modal/AddTask";
import { theme } from "../theme";

interface Todo {
  _typename?: string;
  id: string;
  text: string;
  completed: boolean;
  due: Date;
  priority: string;
  project: string;
  checked: boolean; 
  
}

interface props {
  todo: Todo;
  toggleTodo: (id: any) => void;
  index : number;
  showCompleted: boolean;
  isVisible: boolean;
  closeModal: () => void;
  taskClickHandler: (todo:Todo) => void;
}

const TaskCard: React.FC<props> = ({ todo, toggleTodo, index, showCompleted,closeModal,isVisible, taskClickHandler }) => {
 
  const page = useSelector((state: any) => state.page.currentPage);
  const [elevation, setElevation] = useState(3);

  function dateFormatter(date: Date) {
    let dateStr = date.toDateString().substring(0, date.toDateString().length - 5);
    let day = dateStr.slice(0, 3);
    let rest = dateStr.slice(3);
    return day + ", " + rest;
  }
  const dispatch = useDispatch();

  const todoWithoutTypename = {
  id : todo.id,
  text : todo.text,
  completed : !todo.completed,
  due : todo.due,
  priority : todo.priority,
  project : todo.project,
  checked : todo.checked
  
  }


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

const user = useQuery(GET_USER, {
  variables: { email: "sahil@sahil.com" },
});
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
const CREATE_TASK = gql`
  mutation Mutation($email: String!, $projectName: String!, $task: TaskInput!) {
    createTask(email: $email, projectName: $projectName, task: $task) {
      id
      text
      completed
      due
      priority
      project
      checked
    }
    
  }
`;




const UPDATE_TASK = gql`
  mutation Mutation($email: String!, $projectName: String!, $taskId: ID!, $updatedTask: TaskInput!) {
    updateTask(email: $email, projectName: $projectName, taskId: $taskId, updatedTask: $updatedTask) {
      id
      text
      completed
      due
      priority
      project
      checked
    }
  }`

const [updateTask] = useMutation(UPDATE_TASK);

const handleUpdateTask = (task: any) => {
  console.log(task)

  updateTask({
    variables: {
      email: 'sahil@sahil.com',
      projectName: 'Inbox',
      taskId: task.id,
      updatedTask: task
    },
    refetchQueries: [{ query: GET_USER, variables: { email: 'sahil@sahil.com' } }],
  }).then(() => {
    fetchUser();
  });
};

function handleCheckboxClick(e: any) {
  e.stopPropagation();
  toggleTodo(todo.id);
  setTimeout(() => {
    handleUpdateTask(todoWithoutTypename);
  }, 400);
}

  return (

    <div onClick={()=>taskClickHandler(todo)} style={{cursor:'pointer',}}>
    <Paper
    elevation={elevation}
    onMouseEnter={() => setElevation(6)}
    onMouseLeave={() => setElevation(3)}
      sx={{ margin: "1rem", padding: "1rem", color: "primary.main", marginTop:index===0?'8rem':'0' }}
    >
    

      <ListItem
        key={todo.id}
        sx={{
          display: "flex",
          gap: "10px",
          textAlign: "center",
          fontWeight:'bold',
        }}
      >
        <div onClick={(e) => {
     handleCheckboxClick(e)
    }}>
        <Checkbox
          // checked={todo.checked || todo.completed}
          checked = {showCompleted?!todo.checked:todo.checked}
          sx={{ color: "secondary.main" }}
          color="secondary"
        />
        </div>
        <Box sx={{ width:"40%" }}>
        <ListItemText primary={todo.text} disableTypography sx={{fontSize:'1.1rem'}} />
        </Box>
        {page!=='Today'&&<Box sx={{ width:"40%" }}>
          
        <ListItemText primary={new Date(todo.due).getDate()===new Date().getDate()?"Today":new Date(todo.due).getDate()-new Date().getDate()===-1?"Yesterday":new Date(todo.due).getDate()-new Date().getDate()===1?"Tomorrow":dateFormatter(new Date(todo.due))} disableTypography sx={{color:new Date(todo.due).getDate()===new Date().getDate()?'secondary.main':new Date(todo.due).getDate()-new Date().getDate()===-1?'rgba(255, 41, 55, 1)':'rgba(255, 255, 255, 1)'}} />
        </Box>}
        <Box sx={{ width:"40%" }}>
        <ListItemText primary={todo.priority} disableTypography sx={
{
  fontWeight: 'bold',
  fontSize: '1.04rem',
  color:
  todo.priority === 'P1' ? 'rgba(255, 207, 0, 1)' :
  todo.priority === 'P2' ? 'rgba(102, 150, 255, 1)' :
  todo.priority === 'P3' ? 'rgba(255, 102, 204, 1)' :
         'rgba(255, 255, 255, 1)'
}
}/>
        </Box>
        {(page==='Today'||page==='Upcoming')&&<Box sx={{ width:"40%" }}>
        <ListItemText primary={todo.project}  disableTypography sx={{fontWeight:'bold' }}/>
        </Box>}
      </ListItem>


    </Paper>
    </div>
  );
};

export default TaskCard;
