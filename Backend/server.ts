
const mongoose = require('mongoose');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {typeDef} = require('./schema');


async function startServer() {
  const app = express()

  const server = new ApolloServer({ typeDefs: typeDef });
  await server.start();

 
  mongoose.set('strictQuery', true); // to avoid deprecation warning 
  await mongoose.connect('mongodb://localhost:27017/Taskmaster1');
  console.log("mongodb connected")
  app.use((req: any,res: { send: (arg0: string) => void; }) => {
    res.send('Hello World');
  } )
  app.listen({port: 4000}, () => {
    console.log(`Server ready at port 4000`);
  } );
}

startServer();