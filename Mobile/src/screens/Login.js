import { Image,View,Text, TouchableOpacity} from 'react-native'
import google from "../../assets/google_logo.png"
import {useDispatch} from 'react-redux'
import {setLogin} from '../features/userSlice'

const Login = () => {

    const dispatch = useDispatch();



  return (
<View style={{
         flex: 1,
        backgroundColor: "rgb(34,34,34)",
        justifyContent: "center",
        alignItems: "center",
        // paddingTop: 55,
        // paddingLeft: 20,
 
}}>
    <View style={{
        backgroundColor: "rgb(24,24,24)",
        width: "90%",
            height: "50%",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 20,

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,

        paddingVertical: 50,
        paddingHorizontal: 2

    }}>
    <Text style={{
        fontSize: 30,
        color: "white",
        fontWeight: "bold",

    }}>Login to
    <Text style={{
        color: "#33c6dd",
    }}>
    {' '}
    TaskMaster
    </Text>
    </Text>
    <View style={{
        width: "100%",
            height:"100%",
        justifyContent: "center",
        alignItems: "center",
    }}>
    <TouchableOpacity style={{
        backgroundColor: "white",
        width: 190,
        height: 45,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        flexDirection: "row",
            paddingHorizontal: 20,
            
    }}
    activeOpacity={0.6}
    onPress={() => {
    dispatch(setLogin(true));
    }}
    >
    <Image source={google} style={{
        width: 30,
        height: 30,
        resizeMode: "contain",
        marginRight: 10,
    }}/>

    <Text style={{  fontSize: 14, fontWeight: "500" }}> Sign in with Google </Text>
    </TouchableOpacity>
    </View>    
    </View>
      </View>
  )
}

export default Login
