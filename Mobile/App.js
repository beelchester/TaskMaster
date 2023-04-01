import {APOLLO_URI} from '@env';
import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import Drawer from './Drawer';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { store } from "./src/app/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Login from './src/screens/Login';
import Main from './Main';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();


export default function App() {
    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hideAsync();
        }, 1000);
    }, []);

  const client = new ApolloClient({
    uri: APOLLO_URI,
    cache: new InMemoryCache(),
  });


  return (
      
    <ApolloProvider client={client}>
    <Provider store={store}>
      <Main />
    </Provider>
    </ApolloProvider>
    
  );
}

