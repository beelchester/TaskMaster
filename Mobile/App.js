import { StatusBar } from "expo-status-bar";
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
import { ThemeProvider, Icon, Divider } from "@rneui/themed";
import React, { useState, useRef } from "react";
import TabButton from "./src/components/TabButton";
import { Provider, useDispatch } from "react-redux";
import { store } from "./app/store";

export default function App() {
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;
  const [showMenu, setShowMenu] = useState(false);

  const PROJECTS = [
    {
      title: "School",
    },
    {
      title: "Development",
    },
    {
      title: "Home",
    },
    {
      title: "Personal",
    },
    {
      title: "Music",
    },
    {
      title: "Art",
    },
    {
      title: "Gaming",
    },
    {
      title: "Work",
    },
    {
      title: "Travel",
    },
    {
      title: "Sports",
    },
    {
      title: "Movies",
    },
  ];


  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Image
          style={{ width: 58, height: 58, borderRadius: 20 }}
          source={require("./assets/unnamed.jpg")}
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
          Sahil Yeole
          {/* {store.getState().page.currentPage} */}
        </Text>
        <TabButton title="Today" />
        <TabButton title="Upcoming" />
        <Divider
          color="rgba(100, 100, 100, 1)"
          style={{ width: 170, marginVertical: 20 }}
        />
        
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "white",marginBottom:3 }}>
            Projects
          </Text>
         
        {/* <TabButton title="School" />
        <TabButton title="Development" />
        <TabButton title="Home" />
        <TabButton title="Personal" />
        <TabButton title="Music" /> */}
        <FlatList
          data={PROJECTS}
          renderItem={({ item }) => <TabButton title={item.title} />}
          keyExtractor={(item) => item.title}
          style={{ height: 20 }}
        />
        <TouchableOpacity
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
            borderRadius: 20,
            transform: [{ scale: scaleValue }, { translateX: offsetValue }],
          }}
        >
          <Page />
          <View style={styles.bottomContainer}>
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
            <TouchableOpacity activeOpacity={0.6} style={styles.plus}>
              <Text style={{ fontSize: 28 }}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} style={styles.iconContainer}>
              <Icon name="sort" color={"white"} size={30} />
            </TouchableOpacity>
          </View>
        </Animated.View>
        <StatusBar style="auto" />
      </View>
    </Provider>
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
  bottomContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgb(16, 16, 16)",
    position: "absolute",
    bottom: 0,
    width: "100%",
    // height: 65,
    height: 55,
    left: 0,
    // borderTopStartRadius: 20,
    // borderTopEndRadius: 20,
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingBottom: 5,
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
