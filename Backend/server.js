
const mongoose = require('mongoose');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {typeDefs} = require('./schema');
const {Query} = require('./resolvers/Query');
const {Mutation} = require('./resolvers/Mutation');
const {GraphQLScalarType} = require('graphql');
const User = require('./models/User.model');

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
  serialize(value) {
    return value.toISOString();
  },
}) // custom scalar type

async function startServer() {
  const app = express()
  const server = new ApolloServer({ typeDefs, resolvers:{
    Date: dateScalar,
    Query,
    Mutation
  },
  context: {
    User,
  }
});
  await server.start();
  server.applyMiddleware({ app });
 
  mongoose.set('strictQuery', true); // to avoid deprecation warning 
  await mongoose.connect('mongodb://localhost:27017/Taskmaster0');
  console.log("mongodb connected")
  app.use((req ,res ) => {
    res.send('Hello World');
  } )
  app.listen({port: 4000}, () => {
    console.log(`Server ready at port 4000`);
  } );
}

startServer();