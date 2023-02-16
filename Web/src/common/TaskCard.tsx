import { ListItem, Checkbox, ListItemText, Paper, Box } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddTask from "../modal/AddTask";
import { theme } from "../theme";

interface Todo {
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

 console.log(new Date(todo.due).toDateString(), new Date()) 

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
      toggleTodo(todo.id);
      e.stopPropagation();
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
          
        <ListItemText primary={new Date(todo.due).getDate()===new Date().getDate()?"Today":new Date(todo.due).getDate()-new Date().getDate()===-1?"Yesterday":new Date(todo.due).getDate()-new Date().getDate()===1?"Tomorrow":dateFormatter(new Date(todo.due))} disableTypography sx={{color:new Date(todo.due).getDate()===new Date().getDate()?'secondary.main':'rgba(255, 255, 255, 1)'}} />
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
