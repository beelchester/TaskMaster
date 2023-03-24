import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import { Icon } from '@rneui/base'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from '../features/pageSlice'
import AddProject from '../modal/AddProject'
import { useState } from 'react'
import vertIcon from '../../assets/baseline_more_vert_white_24dp.png'
const TabButton = ({title}) => {
  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.page.currentPage)
    const [showEditProject, setShowEditProject] = useState(false);
    function editHandler() {
        setShowEditProject(true);
    }

  return (

    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        if (title == "Log Out") {
          return 0
        } else {
          dispatch(changePage(title))
        }
      }}
    >
      <View
        style={{
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
          position: 'relative', 
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            paddingLeft: 15,
            color: title == currentPage ? "black" : "white" 
          }}
        >
          {title}
        </Text>
        {title == "Log Out" && <Icon name="logout" size={20} color="white" style={{marginLeft:40}} />}

        {(title !== "Today" &&
          title !== "Log Out" &&
          title !== "Inbox" &&
          title !== "Upcoming"
        ) && 
          <TouchableOpacity onPress={editHandler}
          style={{
            position: 'absolute',
            right: 15, 
                  top: 8,
          }}
          >
            <Image
              source={vertIcon}
              style={{
                width: 20,
                height: 20, 
              }}
             
            />
          </TouchableOpacity>
        }
      </View>
      <AddProject currentProject={title} mode={'edit'} showAddProject={showEditProject} setShowAddProject={setShowEditProject}/>
    </TouchableOpacity>
  )}

export default TabButton
