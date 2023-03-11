import { StyleSheet, View, Text, FlatList } from "react-native";
import { ListItem, CheckBox } from "@rneui/base";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
export default function Page() {
  const toggleCheckbox = () => setChecked(!checked);
  const page = useSelector((state) => state.page.currentPage);
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

  const Item = ({ title, priority, due, project, completed }) =>
  { const [check, setCheck] = useState(completed);
    return (
    <View style={styles.item}>
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
        {/* <View style={styles.dueContainer}> */}
        
        <Text style={{fontWeight: "bold",
    color: priority === "P1"
    ? "rgba(255, 207, 0, 1)"
    : priority === "P2"
    ? "rgba(102, 150, 255, 1)"
    : priority === "P3"
    ? "rgba(255, 102, 204, 1)"
    : "rgba(255, 255, 255, 1)",
    marginBottom: 7,}}>{priority}
        <Text style={styles.due}>  {listDateHandler(due)}</Text>
        </Text>
        {/* </View> */}
        <Text style={styles.project}>{project}</Text>
      </View>
    </View>
  );}
  
    useEffect (() => {
     todos !== undefined && page === "Today"
    ? setData( 
    todos
        .filter(
          (todo) =>
           todo.due&& new Date(todo.due).getDate() === new Date().getDate() 
        )
        .sort((a, b) => {
          return new Date(a.due).valueOf() - new Date(b.due).valueOf();
        })
        .sort((a, b) => {
          const priorityValues = {
            P1: 1,
            P2: 2,
            P3: 3
          };
        
          // if (sort == '1') {
          //   return priorityValues[a.priority] - priorityValues[b.priority];
          // }
          // else if (sort == '3') {
          //   const projectNameComparison = a.project.localeCompare(b.project);
          //   if (projectNameComparison !== 0) {
          //     return projectNameComparison;
          //   }
          // }
            return 0; 
        })):
        todos !== undefined && page === "Upcoming"
          ? setData( todos
              // .filter((todo) => todo.completed === showCompleted)   
              // .sort((a, b) => {
              //   if (!a.due && !b.due) {
              //     return 0;
              //   } else if (!a.due) {
              //     return 1;
              //   } else if (!b.due) {
              //     return -1;
              //   } else {
              //     return new Date(a.due).valueOf() - new Date(b.due).valueOf();
              //   }
              // })
              // .sort((a, b) => {
              //   const priorityValues = {
              //     P1: 1,
              //     P2: 2,
              //     P3: 3
              //   };
              
                // if (sort == '1') {
                //   return priorityValues[a.priority] - priorityValues[b.priority];
                // }
                // else if (sort == '3') {
                //   const projectNameComparison = a.project.localeCompare(b.project);
                //   if (projectNameComparison !== 0) {
                //     return projectNameComparison;
                //   }
                // }
                  // return 0 ; 
              // })
              ): todos !== undefined &&
    setData( todos .filter(
      (todo) =>
        todo.project === page 
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
        P3: 3
      };
    
      // if (sort == '1') {
      //   return priorityValues[a.priority] - priorityValues[b.priority];
      // }
      // else if (sort == '3') {
      //   const projectNameComparison = a.project.localeCompare(b.project);
      //   if (projectNameComparison !== 0) {
      //     return projectNameComparison;
      //   }
      // }
        return 0; 
    })) 
  }, [page]);
    
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.heading}>{page}</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item,index}) => <Item title={item.text}  priority={item.priority} due={item.due} project={item.project} completed = {item.completed} />}
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
    marginRight: 10,
    // backgroundColor: "green",
  },
  
  project: {
    // fontWeight: "bold",
    color: "white",
    fontSize: 15,
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
