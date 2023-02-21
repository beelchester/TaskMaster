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