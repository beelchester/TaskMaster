import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import {store} from './app/store';
import {ApolloClient,InMemoryCache,ApolloProvider} from '@apollo/client'

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <ApolloProvider client={client}>
    <Provider store={store}>
    <App />
    </Provider>
    </ApolloProvider>
)
