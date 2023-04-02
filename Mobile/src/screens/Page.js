import {
  Image,
  StyleSheet,
  View,
    Dimensions,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem, CheckBox, Icon } from "@rneui/base";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProject } from "../features/projectSlice";
import {initialTasks} from '../features/taskSlice'
import AddTask from "../modal/AddTask";
import {useMutation,useQuery} from '@apollo/client'
import {UPDATE_TASK} from '../graphql/TaskMutations'
import {GET_USER} from '../graphql/Query'
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
} from "../features/fetchUserSlice";

export default function Page({sort,fetchUser}) {
  const page = useSelector((state) => state.page.currentPage);
    const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.tasks.tasks);
  const [data, setData] = useState([]);
  function listDateHandler(due) {
    if (due !== null) {
      return new Date(due).getDate() === new Date().getDate() &&
        new Date(due).getMonth() === new Date().getMonth() &&
        new Date(due).getFullYear() === new Date().getFullYear()
        ? "Today"
        : ((new Date(due).getDate() - new Date().getDate() === -1 &&
            new Date(due).getMonth() === new Date().getMonth()) ||
            (new Date(due).getDate() ===
              new Date(
                new Date(due).getFullYear(),
                new Date(due).getMonth() + 1,
                0
              ).getDate() &&
              new Date().getMonth() - new Date(due).getMonth() === 1)) &&
          new Date(due).getFullYear() === new Date().getFullYear()
        ? "Yesterday"
        : new Date(due).getDate() - new Date().getDate() === 1
        ? "Tomorrow"
        : dateFormatter(new Date(due));
    } else {
      return null;
    }
  }
  function dateFormatter(date) {
    let dateStr = date
      .toDateString()
      .substring(0, date.toDateString().length - 5);
    let day = dateStr.slice(0, 3);
    let rest = dateStr.slice(3);
    return day + "," + rest;
  }
  const [showCompleted, setShowCompleted] = useState(false);
  const [showText, setShowText] = useState("Show Completed");
  function handleClickCompleted() {
    setShowCompleted(!showCompleted);
    setShowText(showCompleted ? "Show Completed" : "Show Uncompleted");
  }


  const Item = ({ id, title, priority, due, project, completed }) => {
      const task = {
          id,
        text: title,
        priority,
        project,
        due,
        checked,
        completed: !completed ,
      }
      const [showEditTask, setShowEditTask] = useState(false);

      const [check, setCheck] = useState(completed);
      function toggleCheckbox() {
        setCheck(!check);
          handleUpdateTask();
        // setTimeout(() => { }, 300);
      }

            const [updateTask] = useMutation(UPDATE_TASK)
  const handleUpdateTask = () => {
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
      })
    };

  const user = useQuery(GET_USER, {
    variables: { email: currentUser.email },
  });

  const dispatch = useDispatch();
    const fetchUser = () => {
        if (user.loading) {
            dispatch(fetchUserStart());
        }
        if (user.error) {
            dispatch(fetchUserFailure(user.error));
            return user.error;
        }
        if (user.data) {
            dispatch(fetchUserSuccess(user.data.getUser.user));
            // console.log(user.data.getUser.user)
            dispatch(fetchProject(user.data.getUser.user.projects));
            dispatch(initialTasks(user.data.getTasks));
            // console.log(user.data)
            console.log(user.data.getTasks)
            //   console.log(user.data.getUser.accessToken)
            // localStorage.setItem("accessToken", user.data.getUser.accessToken);
            // localStorage.setItem("refreshToken", user.data.getUser.refreshToken);
        }
    };
    return (
      <TouchableOpacity onPress={()=>setShowEditTask(true)} style={styles.item}>
        <View style={styles.checkboxContainer} onTouchEnd={toggleCheckbox}>
          <CheckBox
            checked={check} 
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor="#33c6dd"
            containerStyle={{ padding: 0, width: 0 }}
          />
        </View>
        <Text style={styles.title}>{title}</Text>
       
        <View style={styles.projectContainer}>

          <Text
            style={{
              fontWeight: "bold",
              color:
                priority === "P1"
                  ? "rgba(255, 207, 0, 1)"
                  : priority === "P2"
                  ? "rgba(102, 150, 255, 1)"
                  : priority === "P3"
                  ? "rgba(255, 102, 204, 1)"
                  : "rgba(255, 255, 255, 1)",
                  marginBottom: due? 1:2
            }}
          >
            {priority}
          </Text>
        {due&&<Text style={{
                    marginBottom: 1,
    color:
                    due &&
                    new Date(due).getDate() === new Date().getDate() &&
                    new Date(due).getMonth() === new Date().getMonth() &&
                    new Date(due).getFullYear() ===
                      new Date().getFullYear()
                      ? "#33c6dd"
                      : due && new Date(due) < new Date()
                      ? "rgba(255, 41, 55, 1)"
                      : "rgba(255, 255, 255, 1)",
    }}> {listDateHandler(due)}</Text>}
          <Text style={styles.project}>{project}</Text>
        </View>
        <AddTask mode={"edit"}
        showAddTask={showEditTask}
        setShowAddTask={setShowEditTask}
        currentTask={task}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    todos !== undefined && page === "Today"
      ? setData(
          todos
            .filter(
              (todo) =>
                todo.due &&
                new Date(todo.due).getDate() === new Date().getDate() &&
                todo.completed === showCompleted
            )
            .sort((a, b) => {
              return new Date(a.due).valueOf() - new Date(b.due).valueOf();
            })
            .sort((a, b) => {
              const priorityValues = {
                P1: 1,
                P2: 2,
                P3: 3,
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
        )
      : todos !== undefined && page === "Upcoming"
      ? setData(
          todos.filter((todo) => todo.completed === showCompleted)
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
          return 0 ;
          })
        )
      : todos !== undefined &&
        setData(
          todos
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
              const priorityValues = {
                P1: 1,
                P2: 2,
                P3: 3,
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
        );
  }, [page, showCompleted, sort, todos]);

  useEffect(() => {
    setShowCompleted(false);
  }, [page]);
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.heading}>{page}</Text>
        <TouchableOpacity onPress={handleClickCompleted} activeOpacity={0.6}
        style={{paddingTop:9,paddingRight:8,
        }}
        >
          {/* <Text style={{color:'white',fontSize:24}}>{showText}</Text> */}
          <View style={{
            backgroundColor : showCompleted ? "rgba(20, 20, 20, 1)" : "transparent",
            borderRadius: 50,
            width: 38,
            height: 38,
            justifyContent: "center",
            alignItems: "center",
            paddingLeft: 1,
          }}>
          <Image
            source={require("../../assets/baseline_task_white_24dp.png")}
            style={{
              width: 24,
              height: 24,
              tintColor: showCompleted
                ? "rgba(255, 255, 255, 1)"
                : "rgba(255, 255, 255, 0.5)",
                flexDirection: "row",
              }
          }
          />
          </View>
        </TouchableOpacity>
      </View>
      {data.length === 0 && (
          <View style={{flex:1,justifyContent:'flex-end',alignItems:'center',marginBottom:20}}>
          <Text style={{
                color: "grey",
                fontSize: 23,
          }}>No Tasks</Text>
          </View>
      )}
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <Item
            id={item.id}
            title={item.text}
            priority={item.priority}
            due={item.due}
            project={item.project}
            completed={item.completed}
          />
        )}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(28, 28, 28)",
    position: "relative",
    paddingTop: 110,
    paddingBottom: 30,
  },
  top: {
    position: "absolute",
    paddingTop: 50,
    paddingHorizontal: 20,
    top: 0,
    // backgroundColor: "red",
    backgroundColor: "rgb(28, 28, 28)",
    width: "100%",
    height: 130,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  list: {
      marginTop: 10,
    paddingHorizontal: 10,
    // marginBottom: 20,
  },
  item: {
    height: 70,
    marginBottom: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(24, 24, 24)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
    // backgroundColor: "red",
    width: "48%",
  },
  checkboxContainer: {
    width: 50,
  },
  projectContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
    // backgroundColor: "green",
  },

  project: {
    // fontWeight: "bold",
    color: "white",
    fontSize: 15,
    marginBottom: 2,
  },
  dueContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // marginBottom: 5,
    // backgroundColor:"red",
    padding: 0,
  },
 
});
