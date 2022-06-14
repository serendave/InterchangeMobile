import { gql } from '@apollo/client';

export const getUsers = gql`
  query GetUsers($getUsersInput: GetUsersInput) {
    users(getUsersInput: $getUsersInput) {
      id
      firstName
      lastName
      email
      photo
      invitations {
        event {
          id
          name
        }
      }
    }
  }
`;
