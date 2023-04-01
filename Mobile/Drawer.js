import { StatusBar } from "expo-status-bar";
import AddTask from "./src/modal/AddTask";
import {
    StyleSheet,
    Text,
    View,
    Animated,
    TouchableOpacity,
    Dimensions,
    Image,
    FlatList,
} from "react-native";
import Page from "./src/screens/Page";
import { theme } from "./src/theme";
import { ThemeProvider, Icon, Divider, Overlay, Input } from "@rneui/themed";
import React, { useState, useRef, useEffect } from "react";
import TabButton from "./src/components/TabButton";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER } from "./src/graphql/Query";
import { CREATE_TASK, UPDATE_TASK } from './src/graphql/TaskMutations'
import {
    fetchUserFailure,
    fetchUserStart,
    fetchUserSuccess,
} from "./src/features/fetchUserSlice";
import { initialTasks } from "./src/features/taskSlice";
import { fetchProject } from "./src/features/projectSlice";
import { CheckBox } from "@rneui/base";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AddProject from "./src/modal/AddProject";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from "./src/modal/Loading";

export default function Drawer() {
    const page = useSelector((state) => state.page.currentPage);
    const offsetValue = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;
    const [showMenu, setShowMenu] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [showAddTask, setShowAddTask] = useState(false);
    const [showAddProject, setShowAddProject] = useState(false);
    const [showEditProject, setShowEditProject] = useState(false);
    const [sort, setSort] = useState("1");
    const [currentProject, setCurrentProject] = useState('');

    const projects = useSelector((state) => state.project.projects);
    const currentUser = useSelector((state) => state.user.user);
    const login = useSelector((state) => state.user.login);

    const dispatch = useDispatch();
    const user = useQuery(GET_USER, {
        variables: { email: currentUser.email },
    });
    useEffect(() => {
        fetchUser();
    }, [login,user,projects,showAddTask,showAddProject]);

    const setAccessToken = async (value) => {
  try {
    await AsyncStorage.setItem('@accessToken', value)
  } catch (e) {
      console.log(e)
  }
}
const getAllValues = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        const values = await AsyncStorage.multiGet(keys)
        console.log(values)
    } catch(e) {
        console.log(e)
    }
}
getAllValues()

    const setRefreshToken = async (value) => {
    try {
        await AsyncStorage.setItem('@refreshToken', value)
    } catch (e) {
        console.log(e)
    }
    }


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

            setAccessToken(user.data.getUser.accessToken)
            setRefreshToken(user.data.getUser.refreshToken)
        }
    };

    useEffect(() => {
        if (sort == "3" && page !== "Today" && page !== "Upcoming") {
            setSort("1");
        }
        if (sort == "2" && page == "Today") {
            setSort("1");
        }
    }, [page]);

    return (
        <View style={styles.container}>
            <Image
                style={{ width: 58, height: 58, borderRadius: 20 }}
                source={{ uri: currentUser.picture }}
            />
            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginTop: 8,
                    marginBottom: 13,
                }}
            >
        {currentUser.name}
            </Text>
            <TabButton title="Today" />
            <TabButton title="Upcoming" />
            <Divider
                color="rgba(100, 100, 100, 1)"
                style={{ width: 170, marginVertical: 20 }}
            />

            <Text
                style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "white",
                    marginBottom: 3,
                }}
            >
                Projects
            </Text>

            {/* <TabButton title="School" />
        <TabButton title="Development" />
        <TabButton title="Home" />
        <TabButton title="Personal" />
        <TabButton title="Music" /> */}
            <FlatList
                data={projects}
                renderItem={({ item }) => <TabButton setShowEditProject={setShowEditProject}  title={item.projectName} 
        setCurrentProject={setCurrentProject}
                    />}
                keyExtractor={(item) => item.projectName}
                style={{ height: 20 }}
            />
            <TouchableOpacity
        onPress={() => {setShowAddProject(true)
        setShowEditProject(false)}}
                activeOpacity={0.6}
                style={{
                    borderRadius: 8,
                    paddingVertical: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 170,
                    // borderWidth: 1.5,
                    // borderColor: "rgb(28, 28, 28)",
                    marginTop: 3,
                }}
            >
                <Text
                    style={{
                        color: "white",
                        fontWeight: "bold",
                    }}
                >
                    Add Project
                </Text>
            </TouchableOpacity>
<AddProject  showAddProject={showEditProject?showEditProject:showAddProject} setShowAddProject={showEditProject?setShowEditProject:setShowAddProject} mode={showEditProject?'edit':'add'} currentProject={currentProject} />
            <Divider
                color="rgba(100, 100, 100, 1)"
                style={{ width: 170, marginTop: 10 }}
            />

            <TabButton title="Log Out" />
            <Animated.View
                style={{
                    flexGrow: 1,
                    backgroundColor: "rgb(28, 28, 28)",
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    paddingTop: 20,
                    paddingBottom: 20,
                    borderRadius: showMenu ? 20 : 0,
                    transform: [{ scale: scaleValue }, { translateX: offsetValue }],
                }}
            >
                <Page sort={sort} fetchUser={fetchUser} />
                <View 
style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "rgb(16, 16, 16)",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 55,
        left: 0,
        paddingHorizontal: 30,
        paddingBottom: 5,
        borderRadius: showMenu ? 20 : 0,
}}
        >
                    <TouchableOpacity
                        onPress={() => {
                            Animated.timing(scaleValue, {
                                toValue: showMenu ? 1 : 0.88,
                                duration: 250,
                                useNativeDriver: true,
                            }).start();
                            Animated.timing(offsetValue, {
                                toValue: showMenu ? 0 : 230,
                                duration: 250,
                                useNativeDriver: true,
                            }).start();
                            Animated.timing(closeButtonOffset, {
                                toValue: !showMenu ? -30 : 0,
                                duration: 300,
                                useNativeDriver: true,
                            }).start();

                            setShowMenu(!showMenu);
                        }}
                        activeOpacity={0.6}
                        style={styles.iconContainer}
                    >
                        <Icon
                            name={showMenu ? "close" : "menu"}
                            color={"white"}
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowAddTask(true)}
                        activeOpacity={0.6}
                        style={styles.plus}
                    >
                        <Text style={{ fontSize: 28 }}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setShowSort(true)}
                        activeOpacity={0.6}
                        style={styles.iconContainer}
                    >
                        <Icon name="sort" color={"white"} size={30} />
                    </TouchableOpacity>
                </View>
            </Animated.View>
            <Overlay
                isVisible={showSort}
                onBackdropPress={() => setShowSort(false)}
                overlayStyle={{
                    // padding: 0,
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: "black",
                    width: 300,
                    height: page === "Upcoming" ? 230 : 185,
                    backgroundColor: "rgb(24, 24, 24)",
                    paddingTop: 15,
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
                    Sort
                </Text>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        width: "60%",
                        alignItems: "center",
                    }}
                    onPress={() => setSort("1")}
                    activeOpacity={0.6}
                >
                    <CheckBox
                        checked={sort === "1"}
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        containerStyle={{ padding: 0, width: 0 }}
                        size={20}
                    />
                    <Text style={{ fontSize: 20, color: "white", marginLeft: 30 }}>
                        By Priority
                    </Text>
                </TouchableOpacity>
                {page !== "Today" && (
                    <>
                        <Divider
                            color="rgba(100, 100, 100, 1)"
                            style={{ width: "100%", marginVertical: 8 }}
                        />
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                width: "60%",
                                alignItems: "center",
                            }}
                            onPress={() => setSort("2")}
                            activeOpacity={0.6}
                        >
                            <CheckBox
                                checked={sort === "2"}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                containerStyle={{ padding: 0, width: 0 }}
                                size={20}
                            />
                            <Text style={{ fontSize: 20, color: "white", marginLeft: 30 }}>
                                By Due Date
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
                {(page === "Today" || page === "Upcoming") && (
                    <>
                        <Divider
                            color="rgba(100, 100, 100, 1)"
                            style={{ width: "100%", marginVertical: 8 }}
                        />
                        <TouchableOpacity
                            style={{
                                flexDirection: "row",
                                width: "60%",
                                alignItems: "center",
                            }}
                            onPress={() => setSort("3")}
                            activeOpacity={0.6}
                        >
                            <CheckBox
                                checked={sort === "3"}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                containerStyle={{ padding: 0, width: 0 }}
                                size={20}
                            />
                            <Text style={{ fontSize: 20, color: "white", marginLeft: 30 }}>
                                By Project
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </Overlay>
            <AddTask
                showAddTask={showAddTask}
                setShowAddTask={setShowAddTask}
                mode={'add'}
            />

            <StatusBar style="auto" />
    <Loading />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgb(34,34,34)",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        paddingTop: 55,
        paddingLeft: 20,
    },
    plus: {
        backgroundColor: "#33c6dd",
        borderRadius: 50,
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 15,
        left: Dimensions.get("window").width / 2 - 25,
    },
    iconContainer: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
});
