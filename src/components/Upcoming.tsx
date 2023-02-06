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

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  due: string;
  priority: string;
  project: string;
}

export default function Today() {
  const [todos, setTodos] = useState([
    { id: 3, text: "Buy groceries", completed: false, due: "Today", priority: "P2", project: "School" },
    { id: 3, text: "Buy groceries", completed: false, due: "Today", priority: "P2", project: "School" },
    { id: 1, text: "Finish project", completed: false, due: "Today", priority: "P1", project: "Inbox" },
    { id: 2, text: "Go for a run", completed: false, due: "Tommorow", priority: "P2", project: "Development" },
    { id: 3, text: "Buy groceries", completed: false, due: "Today", priority: "P2", project: "School" },
    { id: 3, text: "Buy groceries", completed: false, due: "Today", priority: "P2", project: "School" },
    { id: 3, text: "Buy groceries", completed: false, due: "Today", priority: "P2", project: "School" },
    { id: 3, text: "Buy groceries", completed: false, due: "Today", priority: "P2", project: "School" },
  ]);

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
          Upcoming
        </Typography>
        </motion.div>
        </Box>
 

        {todos.map((todo: Todo, index) => (
          
          <TaskCard key={todo.id} todo={todo} index={index} toggleTodo={toggleTodo}/>
        ))}
      </Box>
    </ThemeProvider>
  );
}
