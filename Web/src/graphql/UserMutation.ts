import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation Mutation($email: String!) {
    createUser(email: $email) {
      email
    }
  }
`;