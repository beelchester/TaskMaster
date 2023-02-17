const { gql } = require('apollo-server-express');

const typeDefs = gql`
scalar Date
  type Task {
    id: String!
    text: String!
    completed: Boolean!
    due: Date!
    priority: String!
    project: String!
    checked: Boolean!
  }

  type Project {
    projectName: String!
    tasks: [Task]
  }

  type User {
    email: String!
    projects: [Project]!
  }

  type Query {
    getAllUsers: [User]
    getUser(email: String!): User
    getProjects(email: String!): [Project]
  }

  type Mutation {
    createUser(email: String!): User
    updateUser(email: String!, projects: [ProjectInput]!): User
    deleteUser(email: String!): User

    createTask(email: String!, projectName: String!, task: TaskInput!): User
    updateTask(email: String!, projectName: String!, task: TaskInput!): User
    deleteTask(email: String!, projectName: String!, task: TaskInput!): User

    createProject(email: String!, projectName: String!): User
    updateProject(email: String!, projectName: String!, tasks: [TaskInput]!): User
    deleteProject(email: String!, projectName: String!): User
  }

  input TaskInput {
    id: String!
    text: String!
    completed: Boolean!
    due: String!
    priority: String!
    project: String!
    checked: Boolean!
  }

  input ProjectInput {
    projectName: String!
    tasks: [TaskInput]
  }
`;

exports.typeDefs = typeDefs;