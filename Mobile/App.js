import {APOLLO_URI} from '@env';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import { store } from "./src/app/store";
import { Provider } from "react-redux";
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

