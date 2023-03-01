import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import {store} from './app/store';
import {ApolloClient,InMemoryCache,ApolloProvider} from '@apollo/client'
import { GoogleOAuthProvider } from '@react-oauth/google';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ApolloProvider client={client}>
    <Provider store={store}>
        <GoogleOAuthProvider clientId="675091325788-79tn0tlaoj9oeuoprlghf2tfvntbggju.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </Provider>
    </ApolloProvider>
)
