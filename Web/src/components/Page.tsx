import {
  Box,
  ThemeProvider,
  Typography,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { theme } from "../theme";
import TaskCard from "../common/TaskCard";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Add} from "@mui/icons-material";
import AddTask from "../modal/AddTask";
import taskIcon from "../assets/baseline_task_white_24dp.png"
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

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
  useEffect(() => {
    if (sort == "3" && page !== "Today"&& page !== "Upcoming") {
    setSort("1");
    }
    if (sort =="2" && page == "Today") {
      setSort("1");
    }
  }, [page]);


  const [editModalVisible, setEditModalVisible] = useState(false);
const toggleEditModal = () => {
  setEditModalVisible(!editModalVisible);
};
const [editTodo, setEditTodo] = useState<Todo>()
const taskClickHandler = (todo: Todo) => {
  setEditTodo(todo)
  setEditModalVisible(true);
  // setModalVisible(true);
};
useEffect(() => {
    setShowCompleted(false);
    setShowText("Show Completed");
},[page])
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
          position: "relative",
              // ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Typography
              variant= {windowWidth<900?"h5":"h3"}
              component="h3"
              sx={{ marginTop: "4rem", marginBottom: "0.5rem" }}
            >
              {page}
            </Typography>
          </motion.div>
          <Box sx={{ marginTop: "4rem",
          marginRight: windowWidth<900?0:"1.5rem",
          display:'flex',  justifyContent:'flex-end', alignItems:'center',
          width : windowWidth<900?270:'auto', 
          }}>

            {windowWidth<900&&<Button onClick={() => handleClickCompleted()} sx={{
                marginX:windowWidth<900?'0.5rem':'1.5rem',
            border: showCompleted ? "1px solid #fff" : "none",
            }}>
                {
                        <img src={taskIcon}
                        style={{
                            width: "1.5rem",
                            height: "1.5rem",
                            opacity: showCompleted ? "1" : "0.5",
                        }}
                        />
                    }
              </Button>}
            <Box>
            {windowWidth>900&&<Button onClick={() => handleClickCompleted()} sx={{marginX:'1.5rem',
            border: showCompleted ? "1px solid #fff" : "none",
            }}>
                {" "}
                {showText}{" "}
              </Button>}
              <Select
                onChange={handleSortChange}
                value={sort}
                sx={{
                  color: "white",
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                  height: "3rem",
                  width: windowWidth<900?"8rem":"9rem", 
                  marginRight: windowWidth<900?"1rem":"4rem",
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
                size= {windowWidth<900?"small":"large"}
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
        
        {
            todos.filter(todo=> todo.project === page && todo.completed === showCompleted).length === 0 && page!=="Today" && page!=="Upcoming" &&
            (
                 <Typography variant="h5" component="h5" sx={{
                        fontSize: "1.5rem",
                        position: "absolute",
                        top: "50%",
                        left: windowWidth<900?"40%":"50%", 
                        color: "grey",
                    }}> 
                No Tasks
                </Typography>
            )
            }

        {
            todos.filter(todo=> todo.completed === showCompleted && todo.due&& new Date(todo.due).getDate() === (new Date() as any).getDate()).length === 0 && page==="Today" && 
            (
                 <Typography variant="h5" component="h5" sx={{
                        fontSize: "1.5rem",
                        position: "fixed",
                        top: "50%",
                        left: windowWidth<900?"40%":"50%", 
                        color: "grey",
                    }}> 
                No Tasks
                </Typography>
            )
            }

        {
            todos.filter(todo=> todo.completed === showCompleted).length === 0 && page==="Upcoming" && 
            (
                 <Typography variant="h5" component="h5" sx={{
                        fontSize: "1.5rem",
                        position: "fixed",
                        top: "50%",
                        left: windowWidth<900?"40%":"50%", 
                        color: "grey",
                    }}> 
                No Tasks
                </Typography>
            )
            }

        {todos !== undefined && page === "Today"
          ? todos
              .filter(
                (todo) =>
                 todo.due&& new Date(todo.due).getDate() === (new Date() as any).getDate() && todo.completed === showCompleted
              )
              .sort((a, b) => {
                return new Date(a.due!).valueOf() - new Date(b.due!).valueOf();
              })
              .sort((a, b) => {
                const priorityValues: { [key: string]: number } = {
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
                  return 0; 
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
                  return new Date(a.due!).valueOf() - new Date(b.due!).valueOf();
                }
              })
              .sort((a, b) => {
                const priorityValues: { [key: string]: number } = {
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
                  return 0 ; 
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
                  return new Date(a.due).valueOf() - new Date(b.due).valueOf();
                }
              })
              .sort((a, b) => {
                const priorityValues: { [key: string]: number } = {
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
                  return 0; 
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
