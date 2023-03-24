import {APOLLO_URI} from '@env';
import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import Drawer from './Drawer';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { store } from "./src/app/store";
import { Provider, useDispatch, useSelector } from "react-redux";
export default function App() {
  const client = new ApolloClient({
    uri: APOLLO_URI,
    cache: new InMemoryCache(),
  });
  return (
      
    <ApolloProvider client={client}>
    <Provider store={store}>
    <Drawer />
    </Provider>
    </ApolloProvider>
    
  );
}

