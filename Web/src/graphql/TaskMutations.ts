import { gql } from '@apollo/client';
export  const CREATE_TASK = gql`
mutation Mutation(
  $email: String!
  $projectName: String!
  $task: TaskInput!
) {
  createTask(email: $email, projectName: $projectName, task: $task) {
    id
    text
    completed
    due
    priority
    project
    checked
  }
}
`;

export   const UPDATE_TASK = gql`
mutation Mutation(
  $email: String!
  $projectName: String!
  $taskId: ID!
  $updatedTask: TaskInput!
) {
  updateTask(
    email: $email
    projectName: $projectName
    taskId: $taskId
    updatedTask: $updatedTask
  ) {
    id
    text
    completed
    due
    priority
    project
    checked
  }
}
`;

export const DELETE_TASK = gql`
mutation Mutation($email: String!, $projectName: String!, $taskId: ID!) {
  deleteTask(email: $email, projectName: $projectName, taskId: $taskId) {
    id
    text
    completed
    due
    priority
    project
    checked
  }
}
`;