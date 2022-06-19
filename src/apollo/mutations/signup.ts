import { gql } from '@apollo/client';

export const signup = gql`
  mutation SignUp($createUserInput: CreateUserInput!) {
    signup(createUserInput: $createUserInput) {
      accessToken
      user {
        id
        email
        firstName
        lastName
        dateJoined
        photo
        location {
          latitude
          longitude
        }
      }
    }
  }
`;
