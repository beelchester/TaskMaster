import { gql, useQuery } from "@apollo/client";
import jwt_decode from "jwt-decode";
import {GET_USER} from './graphql/Query';

export function getAccessToken() {
    return localStorage.getItem('accessToken');
}

export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
}

export function isAuthenticated(){
  const accessToken = getAccessToken();
  if (accessToken === null) {
    // localStorage.removeItem('user');
    return false;
  }
  try{
    const {exp} = (jwt_decode(accessToken) as any);
    if(exp<Date.now()/1000){
      // localStorage.removeItem('accessToken');
      // localStorage.removeItem('refreshToken');
      // localStorage.removeItem('user');
      return false;
    }
    return true;
  }
  catch(e){
    // localStorage.removeItem('user');
    return false;
  }
}

export async function refreshToken(email: string, token: string){
  try{
    const REFRESH = gql`
    query Query($email: String!, $refreshToken: String) {
      refresh(email: $email, refreshToken: $refreshToken) {
        accessToken
      }
    }
    `;
    const user = useQuery(REFRESH, {
      variables: { email : email,refreshToken : token },
    });
    const {accessToken} = user.data.refresh;
    // localStorage.setItem('accessToken', accessToken);
    return accessToken;
  }
  catch(e){
  }
}
