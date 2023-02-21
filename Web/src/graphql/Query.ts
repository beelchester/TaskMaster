import { gql } from '@apollo/client';

export const GET_USER = gql`
    query Query($email: String!) {
      getUser(email: $email) {
        email
        projects {
          projectName
          tasks {
            id
            text
            completed
            due
            priority
            project
            checked
          }
        }
      }
      getTasks(email: $email) {
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