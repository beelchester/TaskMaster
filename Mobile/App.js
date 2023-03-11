import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Drawer from './Drawer';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { store } from "./src/app/store";
import { Provider, useDispatch, useSelector } from "react-redux";
export default function App() {
  const client = new ApolloClient({
    // uri: process.env.VITE_APOLLO_URI,
    uri: "http://localhost:4000/graphql",
    // uri :"https://taskmaster-production-70b1.up.railway.app/graphql",
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

