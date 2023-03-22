import {
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Overlay, Input } from "@rneui/themed";
import React, { useState,  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery ,useMutation} from "@apollo/client";
import { GET_USER } from "../graphql/Query";
import {CREATE_TASK, UPDATE_TASK} from '../graphql/TaskMutations'
import {
  fetchUserFailure,
  fetchUserStart,
  fetchUserSuccess,
} from "../features/fetchUserSlice";
import { initialTasks } from "../features/taskSlice";
import { fetchProject } from "../features/projectSlice";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
const AddTask = ({showAddTask,setShowAddTask,mode,currentTask,fetchUser}) => {
  const projects = useSelector((state) => state.project.projects);
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("P1");
const [project, setProject] = useState("Inbox");
const [dueDate, setDueDate] = useState(null);
const [id, setId] = useState("");
 const task = {
 id,
 text: taskName,
 priority,
 project,
 due: dueDate?.toISOString(),
 checked: false,
 completed: false,
};
 useEffect(() => {
    if (mode === "edit") {
      setTaskName(currentTask.text);
      setPriority(currentTask.priority);
      setProject(currentTask.project);
      setDueDate(currentTask.due && new Date(currentTask.due));
      setId(currentTask.id);
    }
  }, [currentTask]);
// pickers
const [priorityOpen, setPriorityOpen] = useState(false);
const [priorityValue, setPriorityValue] = useState("P1");
const [priorityItems, setPriorityItems] = useState([
 { label: "P1", value: "P1" },
 { label: "P2", value: "P2" },
 { label: "P3", value: "P3" },
]);

const [projectOpen, setProjectOpen] = useState(false);
const [projectValue, setProjectValue] = useState(mode === "edit" ? currentTask.project : "Inbox");
const [projectItems, setProjectItems] = useState(
 projects.map((p) => {
   // return project.projectName
   return { label: p.projectName, value: p.projectName };
 })
);
const [showCalendar, setShowCalendar] = useState(false);
const [calendarText, setCalendarText] = useState("Due Date");

const onDateChange = (date) => {
 const currentDate = date || dueDate;
setShowCalendar(false)
 setDueDate(currentDate);
console.log(dueDate)
 let tempDate = new Date(currentDate);
 let fDate =
   tempDate.getDate() +
   "/" +
   (tempDate.getMonth() + 1) +
   "/" +
   tempDate.getFullYear();
 setCalendarText(`Due`);
};

  const dispatch = useDispatch();
  const user = useQuery(GET_USER, {
    variables: { email: "sahilyeole93@gmail.com" },
  });
  useEffect(() => {
    fetchUser();
  }, [user]);

  const [createTask] = useMutation(CREATE_TASK)
  const handleCreateTask = (task) => {
      createTask({
        variables: {
          email: "sahilyeole93@gmail.com",
          projectName: task.project,
          task,
        },
        refetchQueries: [
          { query: GET_USER, variables: { email: "sahilyeole93@gmail.com" } },
        ],
      }).then(() => {
        fetchUser();
      });
    };
  
      const [updateTask] = useMutation(UPDATE_TASK)
  const handleUpdateTask = (task) => {
      updateTask({
          variables: {
          email: "sahilyeole93@gmail.com",
          projectName: task.project,
          taskId: task.id,
          updatedTask: task,
        },
        refetchQueries: [
          { query: GET_USER, variables: { email: "sahilyeole93@gmail.com" } },
        ],
      }).then(() => {
        fetchUser();
      });
    };
      function submitTask() {
      if (taskName.trim().length === 0) return;
      if (mode === "edit") {
        // dispatch(editTask(task));
        handleUpdateTask(task);
        setShowAddTask(false);
        return;
      }
      // dispatch(addTask(task));
      handleCreateTask(task);
      setShowAddTask(false);
      setTaskName("");
      setPriority("P1");
      setProject("Inbox");
      setDueDate(new Date());
    }
  
    function closeHandler() {
      setShowAddTask(false);
      setTaskName("");
      setPriority("P1");
      setProject("Inbox");
      setDueDate(new Date());
    }
  return (
    <Overlay
    isVisible={showAddTask}
    onBackdropPress={() => closeHandler()}
    overlayStyle={{
      // padding: 0,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "black",
      width: Dimensions.get("window").width - 40,
      height: 400,
      backgroundColor: "rgb(24, 24, 24)",
      paddingVertical: 25,
      paddingHorizontal: 20,
    }}
  >
    <Text
      style={{
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
        marginBottom: 20,
      }}
    >
    {mode === "edit" ? "Edit Task" : "Add Task"}
    </Text>

    <Input value={
      taskName
    } onChangeText={(text) => setTaskName(text)}
  placeholder="Task Name" style={{ color: "white" }} />

    <DropDownPicker
      open={projectOpen}
      value={projectValue}
      items={projectItems}
        setOpen={()=>{setProjectOpen(!projectOpen); setPriorityOpen(false)}}
      setValue={setProjectValue}
      setItems={setProjectItems}
      theme="DARK"
      style={
        {
          // width:70
        }
      }
    containerStyle={{
        zIndex: 100000
    }}
    />
    <DropDownPicker
      open={priorityOpen}
      value={priorityValue}
      items={priorityItems}
      setOpen={()=>{setPriorityOpen(!priorityOpen); setProjectOpen(false)}}
      setValue={setPriorityValue}
      setItems={setPriorityItems}
      theme="DARK"
      style={
        {
          // width:70
        }
      }
    />
<TouchableOpacity onPress={() => setShowCalendar(true)} activeOpacity={0.6} >
<Text style={{color:'white'}}>
      {dueDate?.toLocaleDateString() || "No Due"}
</Text>
</TouchableOpacity>
  {
    showCalendar && (
        <DateTimePickerModal 
        isVisible={showCalendar}
        mode="date"
        onConfirm={onDateChange}
        onCancel={() => setShowCalendar(false)}
        />
    )
  }
<TouchableOpacity onPress={submitTask} style={{backgroundColor:"#33c6dd", width:80,
height:40, borderRadius:5, justifyContent:'center', alignItems:'center', marginTop:20
}}  activeOpacity={0.6} >
<Text style={{color:'black',fontWeight:'bold',}}> {mode =="edit" ? "Edit" : "Add"}
</Text>
  </TouchableOpacity>
  </Overlay>
  )
}

export default AddTask
