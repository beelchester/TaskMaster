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
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../theme";
import TaskCard from "../common/TaskCard";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Add, ArrowDropDown } from "@mui/icons-material";
import AddTask from "../modal/AddTask";
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  due: Date|null ;
  priority: string;
  project: string;
  checked: boolean;
}

export default function Page() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const tasks: Todo[] = useSelector((state: any) => state.tasks.tasks);
  const [todos, setTodos] = useState(tasks);
  useEffect(() => {
    setTodos(tasks);
  }, [tasks])


  const page = useSelector((state: any) => state.page.currentPage);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showText, setShowText] = useState("Show Completed");
  function handleClickCompleted() {
    setShowCompleted(!showCompleted);
    setShowText(showCompleted ? "Show Completed" : "Show Uncompleted");
  }
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
  };

  const [sort, setSort] = useState("1");
  function handleSortChange(event: SelectChangeEvent) {
    setSort(event.target.value);
  }
  console.log(sort)
  useEffect(() => {
    if (sort == "3" && page !== "Today"&& page !== "Upcoming") {
    setSort("1");
    }
    if (sort =="2" && page == "Today") {
      setSort("1");
    }
  }, [page]);


  const [editModalVisible, setEditModalVisible] = useState(false);
  function editClickHandler() {
    setEditModalVisible(true);
  }
const toggleEditModal = () => {
  setEditModalVisible(!editModalVisible);
};
const [editTodo, setEditTodo] = useState<Todo>()
const taskClickHandler = (todo: Todo) => {
  setEditTodo(todo)
  setEditModalVisible(true);
  // setModalVisible(true);
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
            initial={{ opacity: 0.3, scale: 1, x: "50", y: "0" }}
            animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
            transition={{
              duration: 0.3,
              delay: 0.0,
              // ease: [0, 0.71, 0.2, 1.01],
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
          <Box sx={{ marginTop: "4rem",marginRight:'1.5rem', display:'flex',  justifyContent:'flex-end', alignItems:'center'}}>
            <Box>
            <Button onClick={() => handleClickCompleted()} sx={{marginX:'1.5rem'}}>
                {" "}
                {showText}{" "}
              </Button>
              <Select
                onChange={handleSortChange}
                value={sort}
                sx={{
                  color: "white",
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  height: "3rem",
                  width: "9rem",
                  marginRight: "4rem",
                  ".MuiSvgIcon-root ": {
                    fill: "white !important",
                  },
                }}
              >
                <MenuItem value={1} sx={{color:'white'}}>By Priority</MenuItem>
                {page!=="Today"&&<MenuItem value={2} sx={{color:'white'}}>By Due Date</MenuItem>}
                {(page==="Today"||page==="Upcoming")&&<MenuItem value={3} sx={{color:'white'}}>By Project</MenuItem>}
              </Select>
              
            </Box>
            <Box>
              <IconButton
                size="large"
                sx={{
                  bgcolor: "secondary.main",
                  ":hover": { bgcolor: "secondary.dark" },
                }}
                onClick={toggleModal}
              >
                <Add sx={{ fontSize: "30px" }} />

              </IconButton>
              {editModalVisible?<AddTask isVisible={editModalVisible} closeModal={toggleEditModal} mode='edit' toEditTask={editTodo}/>:<AddTask isVisible={isModalVisible} closeModal={toggleModal} />}
            </Box>
          </Box>
        </Box>
        
        {todos !== undefined && page === "Today"
          ? todos
              .filter(
                (todo) =>
                 todo.due&& new Date(todo.due).getDate() === new Date().getDate() && todo.completed === showCompleted
              )
              .sort((a, b) => {
                return new Date(a.due) - new Date(b.due);
              })
              .sort((a, b) => {
                const priorityValues = {
                  P1: 1,
                  P2: 2,
                  P3: 3
                };
              
                if (sort == '1') {
                  return priorityValues[a.priority] - priorityValues[b.priority];
                }
                else if (sort == '3') {
                  const projectNameComparison = a.project.localeCompare(b.project);
                  if (projectNameComparison !== 0) {
                    return projectNameComparison;
                  }
                }
                  return ; 
              })
              .map((todo: Todo, index) => (
                <TaskCard
                  key={todo.id}
                  todo={todo}
                  index={index}
                  toggleTodo={toggleTodo}
                  showCompleted={showCompleted}
                  isVisible={isModalVisible} 
                  closeModal={() => setModalVisible(false)}
                  taskClickHandler={taskClickHandler}
                
                />
              ))
          : todos !== undefined && page === "Upcoming"
          ? todos
              .filter((todo) => todo.completed === showCompleted)
              .sort((a, b) => {
                if (!a.due && !b.due) {
                  return 0;
                } else if (!a.due) {
                  return 1;
                } else if (!b.due) {
                  return -1;
                } else {
                  return new Date(a.due) - new Date(b.due);
                }
              })
              .sort((a, b) => {
                const priorityValues = {
                  P1: 1,
                  P2: 2,
                  P3: 3
                };
              
                if (sort == '1') {
                  return priorityValues[a.priority] - priorityValues[b.priority];
                }
                else if (sort == '3') {
                  const projectNameComparison = a.project.localeCompare(b.project);
                  if (projectNameComparison !== 0) {
                    return projectNameComparison;
                  }
                }
                  return ; 
              })
              .map((todo: Todo, index) => (
                <TaskCard
                  key={todo.id}
                  todo={todo}
                  index={index}
                  toggleTodo={toggleTodo}
                  showCompleted={showCompleted}
                  isVisible={isModalVisible} 
                  closeModal={toggleModal}
                  taskClickHandler={taskClickHandler}
                />

              ))
          : todos !== undefined && todos
              .filter(
                (todo) =>
                  todo.project === page && todo.completed === showCompleted
              )
              .sort((a, b) => {
                if (!a.due && !b.due) {
                  return 0;
                } else if (!a.due) {
                  return 1;
                } else if (!b.due) {
                  return -1;
                } else {
                  return new Date(a.due) - new Date(b.due);
                }
              })
              .sort((a, b) => {
                const priorityValues = {
                  P1: 1,
                  P2: 2,
                  P3: 3
                };
              
                if (sort == '1') {
                  return priorityValues[a.priority] - priorityValues[b.priority];
                }
                else if (sort == '3') {
                  const projectNameComparison = a.project.localeCompare(b.project);
                  if (projectNameComparison !== 0) {
                    return projectNameComparison;
                  }
                }
                  return ; 
              })
              .map((todo: Todo, index) => (
                <TaskCard
                  key={todo.id}
                  todo={todo}
                  index={index}
                  toggleTodo={toggleTodo}
                  showCompleted={showCompleted}
                  isVisible={isModalVisible} 
                  closeModal={toggleModal}
                  taskClickHandler={taskClickHandler}
                />
              ))}
            
      </Box>
    </ThemeProvider>
  );
}
