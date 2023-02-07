import {
  Box,
  Checkbox,
  ListItem,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../theme";
import TaskCard from "../common/TaskCard";
import { motion } from "framer-motion";
import { tasks } from "../../db";
import { useSelector } from "react-redux";
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  due: string;
  priority: string;
  project: string;
}

export default function Page() {
  
  const [todos, setTodos] = useState(tasks);

  const page = useSelector((state: any) => state.page.currentPage);

  const toggleTodo = (id: any) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };



  return (
    <ThemeProvider theme={theme}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          color: "primary.main",
         
        }}
      >

<Box
className="Tbox"
      sx={{ position: "fixed", width: "100%",bgcolor: "background.default",zIndex:10,marginTop:"-2rem"  }}
>

    <motion.div
      className="box"
      key={page}
      initial={{ opacity: 0, scale: 0.5, y: "0" }}
      animate={{ opacity: 1, scale: 1, y: "0" }}
      transition={{
        duration: 0.8,
        delay: 0.0,
        ease: [0, 0.71, 0.2, 1.01]
      }
    }
    >
        <Typography variant="h3" component="h3" sx={{marginTop:"4rem", marginBottom:'0.5rem'}} >
          {page}
        </Typography>
        </motion.div>
        </Box>
 

        {page==='Today'?todos.filter(todo=>todo.due==="Today").map((todo: Todo, index) => (
          
          <TaskCard key={todo.id} todo={todo} index={index} toggleTodo={toggleTodo}/>
        )):page==='Upcoming'?todos.map((todo: Todo, index) => (
          
          <TaskCard key={todo.id} todo={todo} index={index} toggleTodo={toggleTodo}/>
        )):todos.filter(todo=>todo.project===page).map((todo: Todo, index) => (
          
          <TaskCard key={todo.id} todo={todo} index={index} toggleTodo={toggleTodo}/>
        ))}
        
        

      </Box>
    </ThemeProvider>
  );
}
