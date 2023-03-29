import {
  Text,
  TouchableOpacity,
  Dimensions,
    View
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
import { CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from "../graphql/ProjectMutations";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWindowDimensions } from "react-native";
import { Icon } from "@rneui/base";

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
        if (mode === "add") {
            setProjectName("");
        }
    }, [currentProject, mode]);
    const currentUser = useSelector((state) => state.user.user);
const [createProject] = useMutation(CREATE_PROJECT);
const handleCreateProject = (name) => {
    createProject({
      variables: {
        projectName: name,
          email: currentUser.email
      },
        refetchQueries: [
            {query: GET_USER, 
            variables: {
                email: currentUser.email
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
        email: currentUser.email,
        newProjectName: newName
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
            // console.log(user.data.getTasks)
            //   console.log(user.data.getUser.accessToken)
            // localStorage.setItem("accessToken", user.data.getUser.accessToken);
            // localStorage.setItem("refreshToken", user.data.getUser.refreshToken);
        }
    };
    const [deleteProject] = useMutation(DELETE_PROJECT);
    const handleDeleteProject = (name) => {
            deleteProject({
      variables: {
        projectName: name,
        email: currentUser.email 
      },
      refetchQueries: [
        { query: GET_USER, variables: { email: currentUser.email } },
      ],
    })

    }

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

function deleteProjectHandler() {
    handleDeleteProject(toEdit);
    setShowAddProject(false);
    setProjectName("");
    fetchUser();
  }

    const [deleteConfirm, setDeleteConfirm] = useState(false);
  
  return (
    
       !deleteConfirm ? (
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

    <Input value={ projectName } onChangeText={(text) => setProjectName(text)} placeholder="Project Name" style={{ color: "white" }} />
      <View style={{
          flexDirection:'row',
            alignItems:'center',
              justifyContent:'space-between',
      }}>
<TouchableOpacity onPress={submitProject}  style={{backgroundColor:"#33c6dd", width:80,
height:40, borderRadius:5, justifyContent:'center', alignItems:'center', marginTop:15
}}  activeOpacity={0.6} >
<Text style={{color:'black',fontWeight:'bold',}}> {mode =="edit" ? "Edit" : "Add"}
</Text>
    </TouchableOpacity>

    {
    mode === "edit" &&
        <TouchableOpacity onPress={()=>setDeleteConfirm(true)} >
    <Icon name="delete" size={30} color="white" style={{
        marginTop:13,
            marginRight:10
    }}/>
    </TouchableOpacity>
    }
</View>
  </Overlay>
      ) 
  : (
    <Overlay

    isVisible={showAddProject}
    onBackdropPress={() => closeHandler()}
    overlayStyle={{
      // padding: 0,
      borderWidth: 1,
      borderRadius: 20,
      borderColor: "black",
    width: Dimensions.get("window").width - 40,
      height: 195,
      backgroundColor: "rgb(24, 24, 24)",
      paddingVertical: 25,
      paddingHorizontal: 20,
    }}
  >
    <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, marginBottom: 20, }}>Are you sure you want to delete this project? </Text>
      <View style={{
          flexDirection:'row',
            alignItems:'center',
              justifyContent:'space-between',
              width: 170,
              marginTop: 5,
      }}>
      <TouchableOpacity onPress={deleteProjectHandler}  style={{backgroundColor:"rgba(255, 41, 55, 0.8)", width:80, height:40, borderRadius:5, justifyContent:'center', alignItems:'center', marginTop:15}}  activeOpacity={0.6} >
<Text style={{color:'white',fontWeight:'bold',}}> Delete </Text>
    </TouchableOpacity>
      <TouchableOpacity onPress={()=>setDeleteConfirm(false)}  style={{ width:80, height:40, borderRadius:5, justifyContent:'center', alignItems:'center', marginTop:15, }}  activeOpacity={0.6} >
<Text style={{color:'white',fontWeight:'bold',}}> Cancel </Text>
    </TouchableOpacity>
</View>
      </Overlay>
  )      
  )
}


export default AddProject
