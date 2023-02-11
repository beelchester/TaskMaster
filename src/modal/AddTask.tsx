import { Visibility } from "@mui/icons-material";
import {
  IconButton,
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask, deleteTask } from "../features/taskSlice";
import { v4 as uuidv4 } from "uuid";
interface props {
  isVisible: boolean;
  closeModal: () => void;
  mode?: string;
  toEditTask?: any;
}

const Modal: React.FC<props> = ({
  isVisible,
  closeModal,
  mode,
  toEditTask,
}) => {
  const newId: string = uuidv4();

  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("P1");
  const [project, setProject] = useState("School");
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [id, setId] = useState(newId);
  const tasks = useSelector((state: any) => state.tasks.tasks);

  useEffect(() => {
    if (mode === "edit") {
      setTaskName(toEditTask.text);
      setPriority(toEditTask.priority);
      setProject(toEditTask.project);
      setDueDate(new Date(toEditTask.due));
      setId(toEditTask.id);
    }
    console.log(taskName);
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

  

  const priorities = ["P1", "P2", "P3"];
  const projects = ["School", "Project 2", "Project 3"];

  const Title = mode === "edit" ? "Edit Task" : "Add Task";

  const dispatch = useDispatch();

  function submitTask() {
    if (mode === "edit") {
      dispatch(editTask(task));
      closeModal();
      return;
    }
    if (taskName.trim().length === 0) return;
    dispatch(addTask(task));
    closeModal();
    setTaskName("");
    setPriority("P1");
    setProject("School");
    setDueDate(new Date());
  }

  function closeHandler() {
    closeModal();
    setTaskName("");
    setPriority("P1");
    setProject("School");
    setDueDate(new Date());
  }

  function deleteHandler() {
    dispatch(deleteTask(toEditTask.id));
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              onClick={closeHandler}
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 100,
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
                  zIndex: 200,
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
                  initial={{ opacity: 0, scale: 0.5, x: "200", y: "10" }}
                  animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.0,
                    ease: [0, 0.71, 0.2, 1.01],
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
                    margin="normal"
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
                    }}
                  />
                  <Box
                    sx={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
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
                        {projects.map((p) => (
                          <MenuItem sx={{ color: "white" }} key={p} value={p}>
                            {p}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <DatePicker
                    selected={dueDate}
                    onChange={(date: Date) => setDueDate(date)}
                  />

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
                  zIndex: 200,
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
                  initial={{ opacity: 0, scale: 0.5, x: "200", y: "-5" }}
                  animate={{ opacity: 1, scale: 1, x: "0", y: "0" }}
                  transition={{
                    duration: 0.4,
                    delay: 0.0,
                    ease: [0, 0.71, 0.2, 1.01],
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
                      display='inline'
                      sx={{ fontWeight: "bold", marginRight: "0.5rem"}}
                    >
                      {taskName}
                    </Typography >
                    <Typography variant="h4"
                      component="h4"
                      display='inline' >
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
                          marginRight:'1.5rem',
                          marginLeft:'0.1rem',
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

export default Modal;
