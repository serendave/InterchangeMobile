import { gql } from '@apollo/client';

export const signin = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signin(signInInput: $signInInput) {
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
