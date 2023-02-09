import { ListItem, Checkbox, ListItemText, Paper, Box } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { theme } from "../theme";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  due: string;
  priority: string;
  project: string;
  checked: boolean; 
  
}

interface props {
  todo: Todo;
  toggleTodo: (id: any) => void;
  index : number;
  showCompleted: boolean;
}

const TaskCard: React.FC<props> = ({ todo, toggleTodo, index, showCompleted }) => {
 
  const page = useSelector((state: any) => state.page.currentPage);
  const [elevation, setElevation] = useState(3);
  console.log(todo.checked, todo.completed);

  return (
    <Paper
    elevation={elevation}
    onMouseEnter={() => setElevation(6)}
    onMouseLeave={() => setElevation(3)}
      sx={{ margin: "1rem", padding: "1rem", color: "primary.main",cursor:'pointer', marginTop:index===0?'8rem':'0' }}
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
        <Checkbox
          // checked={todo.checked || todo.completed}
          checked = {showCompleted?!todo.checked:todo.checked}
          onClick={() => toggleTodo(todo.id)}
          sx={{ color: "secondary.main" }}
          color="secondary"
        />
        <Box sx={{ width:"40%" }}>
        <ListItemText primary={todo.text} disableTypography sx={{fontSize:'1.1rem'}} />
        </Box>
        {page!=='Today'&&<Box sx={{ width:"40%" }}>
        <ListItemText primary={todo.due} disableTypography sx={{color:todo.due==='Today'?'secondary.main':'rgba(255, 255, 255, 1)'}} />
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

  );
};

export default TaskCard;
