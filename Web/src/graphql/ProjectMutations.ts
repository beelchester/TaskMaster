import { gql } from "@apollo/client";

export  const CREATE_PROJECT = gql`
mutation Mutation($email: String!, $projectName: String!) {
  createProject(email: $email, projectName: $projectName) {
    email
    projects {
      projectName
    }
  }
}
`;

export const DELETE_PROJECT = gql`
mutation Mutation($email: String!, $projectName: String!) {
  deleteProject(email: $email, projectName: $projectName) {
    email
    projects {
      projectName
    }
  }
}
`;

export const UPDATE_PROJECT = gql`
mutation Mutation($email: String!, $projectName: String!, $newProjectName: String!) {
  updateProject(email: $email, projectName: $projectName, newProjectName: $newProjectName) {
    email
    projects {
      projectName
    }
  }
}
`;
