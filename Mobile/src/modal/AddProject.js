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
import { CREATE_PROJECT, UPDATE_PROJECT } from "../graphql/ProjectMutations";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from "react-native";

const AddProject = ({showAddProject,setShowAddProject,currentProject,mode}) => {

 const [projectName, setProjectName] = useState("");
    const [toEdit, setToEdit] = useState("");
    function closeHandler() {
        setShowAddProject(false);
    }
    useEffect(() => {
        if (mode === "edit") {
            setProjectName(currentProject);
            setToEdit(currentProject);
        }
    }, [currentProject]);
const [createProject] = useMutation(CREATE_PROJECT);
const handleCreateProject = (name) => {
    createProject({
      variables: {
        projectName: name,
          email: "sahilyeole93@gmail.com"
      },
        refetchQueries: [
            {query: GET_USER, 
            variables: {
                email: "sahilyeole93@gmail.com"
            }
            }
        ]
    });
  }
    const [updateProject] = useMutation(UPDATE_PROJECT);
  const handleEditProject = (name ,newName) => {
    updateProject({
      variables: {
        projectName: name,
        email: "sahilyeole93@gmail.com",
        newProjectName: newName
      },
      refetchQueries: [
        { query: GET_USER, variables: { email: "sahilyeole93@gmail.com" } },
      ],
    })
  };
function submitProject() {
    if (mode === "edit") {
      handleEditProject(toEdit, projectName);
        setShowAddProject(false);
        setProjectName("");
        return;
    }
    handleCreateProject(projectName);
    setShowAddProject(false);
    setProjectName("");
  }

  
  return (
    
    <Overlay

    isVisible={showAddProject}
    onBackdropPress={() => closeHandler()}
    overlayStyle={{
      // padding: 0,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "black",
    width: Dimensions.get("window").width - 40,
      height: 237,
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
    {mode === "edit" ? "Edit Project" : "Add Project"}
    </Text>

    <Input 
    
    value={
      projectName
    } onChangeText={(text) => setProjectName(text)}
  placeholder="Project Name" style={{ color: "white" }} />

<TouchableOpacity onPress={submitProject}  style={{backgroundColor:"#33c6dd", width:80,
height:40, borderRadius:5, justifyContent:'center', alignItems:'center', marginTop:15
}}  activeOpacity={0.6} >
<Text style={{color:'black',fontWeight:'bold',}}> {mode =="edit" ? "Edit" : "Add"}
</Text>
    </TouchableOpacity>
  </Overlay>
  )
}


export default AddProject
