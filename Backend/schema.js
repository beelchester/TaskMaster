const { gql } = require('apollo-server-express');

const typeDefs = gql`
scalar Date
  type Task {
    id : ID!
    text: String!
    completed: Boolean!
    due: Date
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
 
 type Login {
    accessToken: String!
    refreshToken: String!
    user : User!
 }

 type refresh {
    accessToken: String
 }

  type Query {
    getAllUsers: [User]
    getUser(email: String!): Login!
    getProjects(email: String!): [Project]
    getTasks(email: String!): [Task]
    refresh(email:String!,refreshToken: String): refresh

  }

  type Mutation {
    createUser(email: String!): User
    updateUser(email: String!, projects: [ProjectInput]!): User
    deleteUser(email: String!): User

    createTask(email: String!, projectName: String!, task: TaskInput!): Task
    updateTask(email: String!, projectName: String!, taskId: ID!,updatedTask: TaskInput! ): Task
    deleteTask(email: String!, projectName: String!, taskId: ID!): Task

    createProject(email: String!, projectName: String!): User
    updateProject(email: String!, projectName: String!, newProjectName: String! ): User
    deleteProject(email: String!, projectName: String!): User

  }

  input TaskInput {
    id: ID
    text: String!
    completed: Boolean!
    due: String
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