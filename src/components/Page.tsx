import {
  Box,
  Checkbox,
  ListItem,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../theme";
import TaskCard from "../common/TaskCard";
import { AnimatePresence, motion } from "framer-motion";
import { tasks } from "../../db";
import { useSelector } from "react-redux";
import { ArrowDropDown } from "@mui/icons-material";
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  due: string;
  priority: string;
  project: string;
  checked: boolean; 
}

export default function Page() {

  

  const [todos, setTodos] = useState(tasks);

  const page = useSelector((state: any) => state.page.currentPage);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showText, setShowText] = useState('Show Completed');
  function handleClickCompleted() {
    setShowCompleted(!showCompleted);
    setShowText(showCompleted?'Show Completed':'Show Uncompleted');
  }
  useEffect(() => {
    function changeCompleted () {
      setShowCompleted(false)  
      setShowText('Show Completed');
    }
    showCompleted && changeCompleted()
  }, [page]);
  const toggleTodo = (id: any) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            checked: !todo.checked,
          };
        }
        return todo;
      })
    );
    setTimeout(() => {
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
    }, 400);
  
  };
  
  const [sort, setSort] = useState('');
  function handleSortChange(event: SelectChangeEvent) {
    setSort(event.target.value);
  }

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
          sx={{
            position: "fixed",
            width: "calc(100% - 288px)",
            bgcolor: "background.default",
            // bgcolor: "red",
            zIndex: 10,
            marginTop: "-2rem",
            display: "flex",
           justifyContent: "space-between",
           alignItems: "center",
          }}
        >
          <motion.div
            className="box"
            key={page}
            initial={{ opacity: 0, scale: 0.5, y: "0" }}
            animate={{ opacity: 1, scale: 1, y: "0" }}
            transition={{
              duration: 0.8,
              delay: 0.0,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{ marginTop: "4rem", marginBottom: "0.5rem" }}
            >
              {page}
            </Typography>
          </motion.div>
          <Box sx={{marginTop:'4rem'}}>
          <Select onChange={handleSortChange}  value={sort}   sx={{color:'white',bgcolor:"rgba(255, 255, 255, 0.05)", width:'8rem','.MuiSvgIcon-root ': {
              fill: "white !important",
            }}}>
      <MenuItem value={1}>By Priority</MenuItem>
      <MenuItem value={2}>By Due Date</MenuItem>
    </Select>
      
 
          <Button onClick={()=>handleClickCompleted()}> {showText} </Button>
          </Box>
        </Box>

        {page === "Today"
          ? todos
              .filter((todo) => todo.due === "Today"&&todo.completed===showCompleted)
              .map((todo: Todo, index) => (
                <TaskCard
                  key={todo.id}
                  todo={todo}
                  index={index}
                  toggleTodo={toggleTodo}
                  showCompleted={showCompleted}
                />
              ))
          : page === "Upcoming"
          ? todos.filter((todo) => todo.completed===showCompleted).map((todo: Todo, index) => (
            
                <TaskCard
                  key={todo.id}
                  todo={todo}
                  index={index}
                  toggleTodo={toggleTodo}
                  showCompleted={showCompleted}
                />
         
            ))
          : todos
              .filter((todo) => todo.project === page && todo.completed===showCompleted)
              .map((todo: Todo, index) => (
                <TaskCard
                  key={todo.id}
                  todo={todo}
                  index={index}
                  toggleTodo={toggleTodo}
                  showCompleted={showCompleted}
                />
              ))}
      </Box>
    </ThemeProvider>
  );
}
