// dotenv import
require('dotenv').config();
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
  // serialize(value) {
  //   console.log(typeof(value))
  //     return value.toISOString();
  // },
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
  await mongoose.connect(process.env.MONGO_URI);
  console.log("mongodb connected")
  app.use((req ,res ) => {
    res.send('Hello World');
  } )
  const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
}

startServer();