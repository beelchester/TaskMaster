import { View,Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

export default function BottomBar() {

  const screenWidth = Dimensions.get("window").width;

  return(
<View style={styles.container}>
{/* <View style={styles.plus}>
  <Text style={{fontSize:28,}}>+</Text>
</View> */}
<TouchableOpacity activeOpacity={0.6} style={styles.plus}>
  <Text style={{fontSize:28,}}>+</Text>
</TouchableOpacity>
</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(16, 16, 16)",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 65,
    left: 0,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  plus: {
    backgroundColor:"#33c6dd",
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 25,
  left: (Dimensions.get("window").width/2)-25,
  }
});