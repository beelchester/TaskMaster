import { gql, useMutation, useQuery } from "@apollo/client";
import { ListItem, Checkbox, ListItemText, Paper, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProject } from "../features/projectSlice";
import { initialTasks } from "../features/taskSlice";
import {GET_USER} from '../graphql/Query'
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
} from "../features/fetchUserSlice";

interface Todo {
  _typename?: string;
  id: string;
  text: string;
  completed: boolean;
  due: Date | null;
  priority: string;
  project: string;
  checked: boolean;
}

interface props {
  todo: Todo;
  toggleTodo: (id: any) => void;
  index: number;
  showCompleted: boolean;
  isVisible: boolean;
  closeModal: () => void;
  taskClickHandler: (todo: Todo) => void;
}

const TaskCard: React.FC<props> = ({
  todo,
  toggleTodo,
  index,
  showCompleted,
  closeModal,
  isVisible,
  taskClickHandler,
}) => {
  const page = useSelector((state: any) => state.page.currentPage);
  const [elevation, setElevation] = useState(3);
  const currentUser = useSelector((state: any) => state.user.user);
  function dateFormatter(date: Date) {
    let dateStr = date
      .toDateString()
      .substring(0, date.toDateString().length - 5);
    let day = dateStr.slice(0, 3);
    let rest = dateStr.slice(3);
    return day + ", " + rest;
  }
  const dispatch = useDispatch();

  const todoWithoutTypename = {
    id: todo.id,
    text: todo.text,
    completed: !todo.completed,
    due: todo.due,
    priority: todo.priority,
    project: todo.project,
    checked: todo.checked,
  };

  function listDateHandler() {
    if (todo.due !== null) {
      return new Date(todo.due).getDate() === new Date().getDate() &&
        new Date(todo.due).getMonth() === new Date().getMonth() &&
        new Date(todo.due).getFullYear() === new Date().getFullYear()
        ? "Today"
        : ((new Date(todo.due).getDate() - new Date().getDate() === -1 &&
            new Date(todo.due).getMonth() === new Date().getMonth()) ||
            (new Date(todo.due).getDate() ===
              new Date(
                new Date(todo.due).getFullYear(),
                new Date(todo.due).getMonth() + 1,
                0
              ).getDate() &&
              new Date().getMonth() - new Date(todo.due).getMonth() === 1)) &&
          new Date(todo.due).getFullYear() === new Date().getFullYear()
        ? "Yesterday"
        : new Date(todo.due).getDate() - new Date().getDate() === 1
        ? "Tomorrow"
        : dateFormatter(new Date(todo.due));
    } else {
      return "No Due Date";
    }
  }

  

  const user = useQuery(GET_USER, {
    variables: { email: currentUser.email },
  });
  const fetchUser = () => {
    if (user.loading) {
      dispatch(fetchUserStart());
    }
    if (user.error) {
      dispatch(fetchUserFailure(user.error));
    }
    if (user.data) {
      dispatch(fetchUserSuccess(user.data.user.getUser));
      dispatch(fetchProject(user.data.getUser.user.projects));
      dispatch(initialTasks(user.data.getTasks));
    }
  };

  const UPDATE_TASK = gql`
    mutation Mutation(
      $email: String!
      $projectName: String!
      $taskId: ID!
      $updatedTask: TaskInput!
    ) {
      updateTask(
        email: $email
        projectName: $projectName
        taskId: $taskId
        updatedTask: $updatedTask
      ) {
        id
        text
        completed
        due
        priority
        project
        checked
      }
    }
  `;

  const [updateTask] = useMutation(UPDATE_TASK);

  const handleUpdateTask = (task: any) => {

    updateTask({
      variables: {
        email: currentUser.email,
        projectName: task.project,
        taskId: task.id,
        updatedTask: task,
      },
      refetchQueries: [
        { query: GET_USER, variables: { email: currentUser.email } },
      ],
    }).then(() => {
      fetchUser();
    });
  };

  function handleCheckboxClick(e: any) {
    e.stopPropagation();
    toggleTodo(todo.id);
    setTimeout(() => {
      handleUpdateTask(todoWithoutTypename);
    }, 400);
  }

        const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


  return (
    <div onClick={() => taskClickHandler(todo)} style={{ cursor: "pointer" }}>
      <Paper
        elevation={elevation}
        onMouseEnter={() => setElevation(6)}
        onMouseLeave={() => setElevation(3)}
        sx={{
          margin: windowWidth < 900 ? "0rem" : "1rem", 
            marginBottom: '1rem',
          padding: windowWidth < 900 ? "0rem" : "1rem", 
          color: "primary.main",
          marginTop: index === 0 ? "8rem" : "0",
        }}
      >
        <ListItem
          key={todo.id}
          sx={{
            display: "flex",
            gap: "10px",
            textAlign: "center",
            fontWeight: windowWidth < 900 ? "normal" : "bold",
          }}
        >
          <div
            onClick={(e) => {
              handleCheckboxClick(e);
            }}
          >
            <Checkbox
              // checked={todo.checked || todo.completed}
              checked={showCompleted ? !todo.checked : todo.checked}
              sx={{ color: "secondary.main" }}
              color="secondary"
            />
          </div>
          <Box sx={{ width: "40%" }}>
            <ListItemText
              primary={todo.text}
              disableTypography
              sx={{ fontSize: "1.1rem" }}
            />
          </Box>
          {page !== "Today" && (
            <Box sx={{ width: "40%" }}>
              <ListItemText
                primary={listDateHandler()}
                disableTypography
                sx={{
                  color:
                    todo.due &&
                    new Date(todo.due).getDate() === new Date().getDate() &&
                    new Date(todo.due).getMonth() === new Date().getMonth() &&
                    new Date(todo.due).getFullYear() ===
                      new Date().getFullYear()
                      ? "secondary.main"
                      : todo.due && new Date(todo.due) < new Date()
                      ? "rgba(255, 41, 55, 1)"
                      : "rgba(255, 255, 255, 1)",
                      fontSize: windowWidth < 900 ? "0.9rem" : "1rem",
                }}
              />
            </Box>
          )}
          <Box sx={{ width: "40%" }}>
            <ListItemText
              primary={todo.priority}
              disableTypography
              sx={{
                fontWeight: windowWidth < 900 ? "normal" : "bold",
                fontSize: "1.04rem",
                color:
                  todo.priority === "P1"
                    ? "rgba(255, 207, 0, 1)"
                    : todo.priority === "P2"
                    ? "rgba(102, 150, 255, 1)"
                    : todo.priority === "P3"
                    ? "rgba(255, 102, 204, 1)"
                    : "rgba(255, 255, 255, 1)",
              }}
            />
          </Box>
          {(page === "Today" || page === "Upcoming") && (
            <Box sx={{ width: "40%" }}>
              <ListItemText
                primary={todo.project}
                disableTypography
                sx={{ 
                fontWeight: windowWidth < 900 ? "normal" : "bold",
                    }}
              />
            </Box>
          )}
        </ListItem>
      </Paper>
    </div>
  );
};

export default TaskCard;
