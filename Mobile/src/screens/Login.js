import { Image,View,Text, TouchableOpacity} from 'react-native'
import google from "../../assets/google_logo.png"
import {useDispatch} from 'react-redux'
import {setLogin} from '../features/userSlice'
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useState, useEffect } from 'react';
import {ANDROID_CLIENT_ID, IOS_CLIENT_ID, WEB_CLIENT_ID} from '@env'
import { setUser } from '../features/userSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import {CREATE_USER} from '../graphql/UserMutation.js'
import { useMutation } from '@apollo/client';


WebBrowser.maybeCompleteAuthSession();

const Login = () => {
    const dispatch = useDispatch();

  const [createUser] = useMutation(CREATE_USER);
  const handleCreateUser = async (user) => {
    createUser({
      variables: {
        email: user.email,
      },
    });
  };


    const [accessToken, setAccessToken] = useState(null);
    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId:  "675091325788-79tn0tlaoj9oeuoprlghf2tfvntbggju.apps.googleusercontent.com",
        iosClientId:  "675091325788-e9h2oo5rm418php4bg9e7rjh4na50tqc.apps.googleusercontent.com",
        androidClientId:  "675091325788-i1vppj69i39v9atrf9qhneg0elr247du.apps.googleusercontent.com",
    });

    useEffect(() => {
        if (response?.type === 'success') {
            setAccessToken(response.authentication.accessToken);
            if (accessToken) {
                fetchUserInfo();
            }
        }},[response,accessToken]);

    const setUserStorage = async (user) => {
        try {
            await AsyncStorage.setItem('@user', JSON.stringify(user));
        } catch (e) {
            console.log(e);
        }
    };


    async function fetchUserInfo(){
        console.log("called")
        let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
    });
        const userInfo = await response.json();
        const {email, name, picture} = userInfo;
        const currentUser = {
            name: name,
            email: email,
            picture: picture,
        }
        handleCreateUser(currentUser);
        dispatch(setUser(currentUser));
        dispatch(setLogin(true));
        setUserStorage(currentUser);
    }



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
        promptAsync();
    }}
    disabled={!request}
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
    <StatusBar style="dark" />
      </View>
  )
}

export default Login
