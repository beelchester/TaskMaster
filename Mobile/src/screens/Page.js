import { StyleSheet, View, Text, FlatList } from "react-native";
import { ListItem, CheckBox } from "@rneui/base";
import React, { useState } from "react";
import { useSelector } from "react-redux";
export default function Page() {
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);
  const currentPage = useSelector((state) => state.page.currentPage);
  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id:"c1b1-46c2-aed5-3ad53abb28ba",
      title: "Fourth Item",
    },
    {
      id:"c605-48d3-a4f8-fbd91aa97f63",
      title: "Fifth Item",
    },
    {
      id:"3da1-471f-bd96-145571e29d72",
      title: "Sixth Item",
    },
    {
      id:"c1c1-46c2-aed5-3ad53abb28ba",
      title: "Seventh Item",
    },
    {
      id:"c625-48d3-a4fd-fbd91aa97f63",
      title: "Eighth Item",
    },
    {
      id:"3ba1-471f-bd96-145571e29d72",
      title: "Ninth Item",
    },
    {
      id:"d1b1-46c2-aed5-3aa53abb28ba",
      title: "Tenth Item",
    },
  ];
  const Item = ({ title }) => (
    <View style={styles.item}>
      <View style={styles.checkboxContainer} onTouchEnd={toggleCheckbox}>
        <CheckBox
          checked={checked}
          iconType="material-community"
          checkedIcon="checkbox-marked"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor="#33c6dd"
          containerStyle={{ padding: 0, width: 0 }}
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.projectContainer}>
        {/* <View style={styles.dueContainer}> */}
        
        <Text style={styles.priority}>P1
        <Text style={styles.due}>  Thu, 13 Feb</Text>
        </Text>
        {/* </View> */}
        <Text style={styles.project}>School</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.heading}>{currentPage}</Text>
      </View>
      <FlatList
        data={DATA}
        renderItem={({ item,index}) => <Item title={item.title} index={index} />}
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
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  list: {
    paddingHorizontal: 10,
    // marginBottom: 20,
  },
  item: {
    height: 70,
    marginBottom: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(24, 24, 24)",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
    // backgroundColor: "red",
    width: "50%",
  },
  checkboxContainer: {
    width: 50,
  },
  projectContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    // backgroundColor: "green",
  },
  priority: {
    fontWeight: "bold",
    color: "yellow",
    marginBottom: 7,
  },
  project: {
    // fontWeight: "bold",
    color: "white",
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
  due: {
    color: "white",
    marginLeft: 5,
  },
});
