import React from 'react'
import Drawer from './Drawer'
import Login from './src/screens/Login'
import {useSelector,useDispatch} from 'react-redux'
import { isAuthenticated } from './src/auth'
import { setLogin, setUser } from './src/features/userSlice'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Main = () => {

    const login = useSelector((state) => state.user.login);
    const page = useSelector((state) => state.user.page);
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.user);
    console.log(currentUser)

    const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
  }
};

    isAuthenticated();
console.log(login)

const getUserStorage = async () => {
    try {
        const value = await AsyncStorage.getItem('@user')
        if(value !== null) {
            return JSON.parse(value)
        }
    } catch(e) {
        console.log(e)
    }
}

useEffect(() => {
    console.log('tried')
    getUserStorage().then((user) => {
        if(user){
            dispatch(setUser(user))
        }
    }
    )
},[])

useEffect(() => {
    isAuthenticated().then((authenticated) => {
        console.log(authenticated);
        if (authenticated) {
            dispatch(setLogin(true));
        } else {
            dispatch(setLogin(false));
        }
    });
}, []);


  return (
      <> 
      {login ? <Drawer /> : <Login />}
      </>
  )
}

export default Main
