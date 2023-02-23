import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import {Calendar} from 'react-date-range';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initialTasks,
} from "../features/taskSlice";
import { gql, useMutation, useQuery } from "@apollo/client";
import { fetchProject } from "../features/projectSlice";
import {
  fetchUserStart,
  fetchUserFailure,
  fetchUserSuccess,
} from "../features/userSlice";
import {CREATE_TASK,UPDATE_TASK,DELETE_TASK} from '../graphql/TaskMutations';
import { GET_USER } from "../graphql/Query";
import "./calendar.css"
interface props {
  isVisible: boolean;
  closeModal: () => void;
  mode?: string;
  toEditTask?: any;
}

const AddTask: React.FC<props> = ({
  isVisible,
  closeModal,
  mode,
  toEditTask,
}) => {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("P1");
  const [project, setProject] = useState("School");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [id, setId] = useState("");
  const tasks = useSelector((state: any) => state.tasks.tasks);

  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (mode === "edit") {
      setTaskName(toEditTask.text);
      setPriority(toEditTask.priority);
      setProject(toEditTask.project);
      setDueDate(new Date(toEditTask.due));
      setId(toEditTask.id);
    }
  }, [toEditTask]);

  const task = {
    id,
    text: taskName,
    priority,
    project,
    due: dueDate.toISOString(),
    checked: false,
    completed: false,
  };

  const projectList = useSelector((state: any) => state.projects.projects);


const projectNames = projectList.map((project:any) => project.projectName);


  const priorities = ["P1", "P2", "P3"];
  const projects = projectNames
// console.log(projects)
  const Title =
    mode === "edit"
      ? "Edit Task"
      : mode === "project"
      ? "Add Project"
      : "Add Task";

  const dispatch = useDispatch();

 

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
  };


  const [createTask] = useMutation(CREATE_TASK);
  const handleCreateTask = (task: any) => {
    createTask({
      variables: {
        email: "sahil@sahil.com",
        projectName: task.project,
        task,
      },
      refetchQueries: [
        { query: GET_USER, variables: { email: "sahil@sahil.com" } },
      ],
    }).then(() => {
      fetchUser();
    });
  };


  const [updateTask] = useMutation(UPDATE_TASK);

  const handleUpdateTask = (task: any) => {
    console.log(task);

    updateTask({
      variables: {
        email: "sahil@sahil.com",
        projectName: "Inbox",
        taskId: task.id,
        updatedTask: task,
      },
      refetchQueries: [
        { query: GET_USER, variables: { email: "sahil@sahil.com" } },
      ],
    }).then(() => {
      fetchUser();
    });
  };



  const [deleteTask] = useMutation(DELETE_TASK);

  const handleDeleteTask = (task: any) => {
    console.log(task.id);
    deleteTask({
      variables: {
        email: "sahil@sahil.com",
        projectName: "Inbox",
        taskId: task.id,
      },
      refetchQueries: [
        { query: GET_USER, variables: { email: "sahil@sahil.com" } },
      ],
    }).then(() => {
      fetchUser();
    });
  };

  function submitTask() {
    if (mode === "edit") {
      // dispatch(editTask(task));
      handleUpdateTask(task);
      closeModal();
      return;
    }
    if (taskName.trim().length === 0) return;
    // dispatch(addTask(task));
    handleCreateTask(task);
    closeModal();
    setTaskName("");
    setPriority("P1");
    setProject("Inbox");
    setDueDate(new Date());
  }

  function closeHandler() {
    closeModal();
    setTaskName("");
    setPriority("P1");
    setProject("School");
    setDueDate(new Date());
  }

  function handlebgclick(){
   if  (showDeleteConfirm){
    return
   }
    closeHandler()
  }

  function deleteHandler() {
    // dispatch(deleteTask(toEditTask.id));
    handleDeleteTask(toEditTask);
    closeModal();
    setShowDeleteConfirm(false);
  }
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [animateDelete, setAnimateDelete] = useState(0);
  function deleteConfirmHandler() {
    setShowDeleteConfirm(!showDeleteConfirm);
    setAnimateDelete((prev) => prev++);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* add/edit task modal */}

          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              onClick={handlebgclick}
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 1000,
                backdropFilter: "blur(5px)",
                width: "100%",
                height: "100%",
              }}
            />
            
          </motion.div>

          {!showDeleteConfirm ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0,}}
              transition={{ duration: 0.2 }}
            >
              <Box
                sx={{
                  bgcolor: "background.paper",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  paddingX: "60px",
                  paddingY: "4rem",
                  zIndex: 2000,
                  border: "1px solid",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  width: "50rem",
                  height: "30rem",
                }}
              >
               <motion.div
            className="box"
            key={Title}
            initial={{ opacity: 0.3, scale: 1, x: "50", y: "0" }}
            animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
            transition={{
              duration: 0.2,
              delay: 0.0,
              // ease: [0, 0.71, 0.2, 1.01],
            }}
                 
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{ marginBottom: "0.5rem" }}
                  >
                    {Title}
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.0,
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "17.3rem",
                  }}
                >
                  <TextField
                    label="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    // margin="normal"
                    inputProps={{ style: { color: "white" } }}
                    InputLabelProps={{
                      style: { color: "white", outlineColor: "white" },
                    }}
                    variant="outlined"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiOutlinedInput-root:hover": {
                        "& fieldset": { borderColor: "white" },
                      },
                      marginTop: "0.8rem",
                      marginBottom: "0.2rem",
                    }}
                  />
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop:"0.5rem"
                    }}
                  >
                    <FormControl>
                      <InputLabel sx={{ color: "white" }} id="priority-label">
                        Priority
                      </InputLabel>
                      <Select
                        labelId="priority-label"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        label="Priority"
                        sx={{
                          color:
                            priority === "P1"
                              ? "rgba(255, 207, 0, 1) "
                              : priority === "P2"
                              ? "rgba(102, 150, 255, 1) "
                              : priority === "P3"
                              ? "rgba(255, 102, 204, 1) "
                              : "white",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.7)",
                          },
                          "&:hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "white",
                            },
                          },
                          ".MuiSvgIcon-root ": {
                            fill: "white !important",
                          },
                        }}
                      >
                        {priorities.map((p) => (
                          <MenuItem sx={{ color: "white" }} key={p} value={p}>
                            {p}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl>
                      <InputLabel sx={{ color: "white" }} id="project-label">
                        Project
                      </InputLabel>
                      <Select
                        labelId="project-label"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        label="Project"
                        sx={{
                          color: "white",
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.7)",
                          },
                          "&:hover": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "white",
                            },
                          },
                          ".MuiSvgIcon-root ": {
                            fill: "white !important",
                          },
                        }}
                      >
                        {projects.map((p:any) => (
                          <MenuItem sx={{ color: "white" }} key={p} value={p}>
                            {p}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                
                  <TextField value={`${dueDate.getDate()}-${dueDate.getMonth()}-${dueDate.getFullYear()}`} 
                  label="Due Date"
                  InputLabelProps={{
                    style: { color: "white", outlineColor: "white" },
                  }}
                  inputProps={{ style: { color: "white", outlineColor:"white",
                padding:"10px 14px"
                } }}
                  sx={{
                 "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255,255,255,0.7)",
                      },
                      "& .MuiOutlinedInput-root:hover": {
                        "& fieldset": { borderColor: "white" },
                      },
                      // height: "45px",
                      marginTop:"0.87rem",
                      // marginBottom:"0.9rem",
                      width: "30%",
                      
                }}></TextField>
                 {showCalendar && <Calendar
                  date={dueDate} onChange={(date:Date)=>setDueDate(date)} 
                  color="#33c6dd"
                  className="calendar"
                  
                  />}

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "1rem",
                      alignItems: "center",
                    }}
                  >
                    {mode === "edit" ? (
                      <Button
                        onClick={deleteConfirmHandler}
                        size="large"
                        sx={{
                          bgcolor: "rgba(255, 41, 55, 0.8)",
                          color: "white",
                          ":hover": { bgcolor: "rgba(255, 41, 55, 0.76)" },
                        }}
                      >
                        Delete
                      </Button>
                    ) : (
                      <div></div>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        size="large"
                        onClick={submitTask}
                        sx={{
                          paddingX: "1.5rem",
                          marginX: "1.5rem",
                          bgcolor: "secondary.main",
                          color: "black",
                          ":hover": { bgcolor: "secondary.dark" },
                        }}
                      >
                        {" "}
                        {mode === "edit" ? "Edit" : "Add"}{" "}
                      </Button>
                      <Button onClick={closeHandler} size="large">
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          ) : (
            // delete confirm modal
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
          
            >
              <Box
                sx={{
                  bgcolor: "background.paper",
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  paddingX: "60px",
                  paddingY: "4rem",
                  zIndex: 2000,
                  border: "1px solid",
                  borderColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  width: "50rem",
                  height: "20rem",
                }}
              >
               <motion.div
            className="box"
            key={animateDelete}
            initial={{ opacity: 0.3, scale: 0.8, x: "50", y: "-2" }}
            animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
            transition={{
              duration: 0.2,
              delay: 0.0,
              // ease: [0, 0.71, 0.2, 1.01],
            }}
                >
                  <Typography
                    variant="h4"
                    component="h4"
                    sx={{ marginBottom: "0.5rem" }}
                  >
                    Are you sure you want to delete
                  </Typography>
                  <Typography
                    variant="h4"
                    component="h4"
                    display="inline"
                    sx={{ fontWeight: "bold", marginRight: "0.5rem" }}
                  >
                    {taskName}
                  </Typography>
                  <Typography variant="h4" component="h4" display="inline">
                    ?
                  </Typography>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.0,
                  }}
                  style={{
                    display: "flex",
                    marginTop: "3rem",
                  }}
                >
                  <Button
                    onClick={deleteHandler}
                    size="large"
                    sx={{
                      marginRight: "1.5rem",
                      marginLeft: "0.1rem",
                      paddingX: "1.5rem",
                      bgcolor: "rgba(255, 41, 55, 0.8)",
                      color: "white",
                      ":hover": { bgcolor: "rgba(255, 41, 55, 0.76)" },
                    }}
                  >
                    Yes
                  </Button>
                  <Button onClick={deleteConfirmHandler} size="large">
                    Cancel
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default AddTask;
