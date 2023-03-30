import { gql, useQuery } from "@apollo/client";
import jwt_decode from "jwt-decode";
import {GET_USER} from './graphql/Query';
import AsyncStorage from '@react-native-async-storage/async-storage';


const getAccessToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@accessToken')
        if(value !== null) {
            return value
        }
    } catch(e) {
        console.log(e)
    }
}

const getRefreshToken = async () => {
    try {
        const value = await AsyncStorage.getItem('@refreshToken')
        if(value !== null) {
            return value
        }
    } catch(e) {
        console.log(e)
    }
}

export async function isAuthenticated() {
  try {
    const accessToken = await getAccessToken();
    if (accessToken === null) {
      return false;
    }
    const { exp } = jwt_decode(accessToken);
    console.log(exp, Date.now() / 1000, exp - Date.now() / 1000);
    if (exp < Date.now() / 1000) {
      console.log("dded");
      return false;
    }
    console.log("Authenticated");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}


export async function refreshToken(email, token){
  try{
    console.log("token")
    const REFRESH = gql`
    query Query($email: String!, $refreshToken: String) {
      refresh(email: $email, refreshToken: $refreshToken) {
        accessToken
      }
    }
    `;
    const user = useQuery(REFRESH, {
      variables: { email ,refreshToken },
    });
    const {accessToken} = user.data.refresh;
    return accessToken;
  }
  catch(e){
    console.log(e)
  }
}

