// dotenv import
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {typeDefs} = require('./schema');
const {Query} = require('./resolvers/Query');
const {Mutation} = require('./resolvers/Mutation');
const {GraphQLScalarType} = require('graphql');
const User = require('./models/User.model');
const RefreshToken = require('./models/RefreshToken.model');
const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value) {
    return new Date(value);
  },
})

async function startServer() {
  const app = express()
  const server = new ApolloServer({ typeDefs, resolvers:{
    Date: dateScalar,
    Query,
    Mutation
  },
  context: {
    User,
    RefreshToken,
  }
});
  await server.start();
  server.applyMiddleware({ app });
 
  app.use(
    cors({
      origin: ["https://taskmaster0.netlify.app", "https://play.google.com","https://famous-dango-0f8e10.netlify.app/"],
      optionsSuccessStatus: 200,
    })
  );
 
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