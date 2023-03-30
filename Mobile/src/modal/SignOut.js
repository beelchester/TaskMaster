import React from 'react'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import { Overlay } from '@rneui/base'


const SignOut = ({showSignOut,setShowSignOut,logoutHandler}) => {
  return (

    <Overlay
    onBackdropPress={() => setShowSignOut(false)}
    isVisible={showSignOut}
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
    <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, marginBottom: 20, }}>Are you sure you want to SignOut?</Text>
      <View style={{
          flexDirection:'row',
            alignItems:'center',
              justifyContent:'space-between',
              width: 170,
              marginTop: 5,
      }}>
      <TouchableOpacity onPress={logoutHandler} style={{backgroundColor:"rgba(255, 41, 55, 0.8)", width:80, height:40, borderRadius:5, justifyContent:'center', alignItems:'center', marginTop:15}}  activeOpacity={0.6} >
<Text style={{color:'white',fontWeight:'bold',}}> Yes </Text>
    </TouchableOpacity>
      <TouchableOpacity onPress={()=>setShowSignOut(false)}  style={{ width:80, height:40, borderRadius:5, justifyContent:'center', alignItems:'center', marginTop:15, }}  activeOpacity={0.6} >
<Text style={{color:'white',fontWeight:'bold',}}> Cancel </Text>
    </TouchableOpacity>
</View>
      </Overlay>
  )
}

export default SignOut
