import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from '@rneui/base'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../features/pageSlice'

const TabButton = ({title}) => {
  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.page.currentPage)
  return (

    <TouchableOpacity
    activeOpacity={0.6}
    onPress={() => {
      if (title == "Log Out") {
        return 0
      } else {
      dispatch(changePage(title))
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: title == currentPage ? "#33c6dd" : title == "Log Out" ? "rgb(28, 28, 28)" : "transparent",
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15,
        width: 170,
        marginBottom: title == "Log Out" ? '16%' : 0,
      }}>

        {/* <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white"
        }}></Image> */}

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: title == currentPage ? "black" : "white" 
        }}>{title}</Text>
        {title == "Log Out" && <Icon name="logout" size={20} color="white" style={{marginLeft:40}} />}
      </View>
    </TouchableOpacity>
  )}

export default TabButton