import { ListItem, Checkbox, ListItemText, Paper, Table, TableCell, TableRow, Box } from "@mui/material";
import React, { useState } from "react";
import { theme } from "../theme";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  due: string;
  priority: string;
  project: string;
}

interface props {
  todo: Todo;
  toggleTodo: (id: any) => void;
  index : number;
}

const TaskCard: React.FC<props> = ({ todo, toggleTodo, index }) => {
  
  const [elevation, setElevation] = useState(3);

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
          checked={todo.completed}
          onClick={() => toggleTodo(todo.id)}
          sx={{ color: "secondary.main" }}
          color="secondary"
        />
        <Box sx={{ width:"25%" }}>
        <ListItemText primary={todo.text} disableTypography sx={{fontSize:'1.1rem'}} />
        </Box>
        <Box sx={{ width:"25%" }}>
        <ListItemText primary={todo.due} disableTypography />
        </Box>
        <Box sx={{ width:"25%" }}>
        <ListItemText primary={todo.priority} disableTypography/>
        </Box>
        <Box sx={{ width:"25%" }}>
        <ListItemText primary={todo.project}  disableTypography/>
        </Box>
      </ListItem>
      
  
 
    </Paper>

  );
};

export default TaskCard;
