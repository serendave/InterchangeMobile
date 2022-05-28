import { gql } from '@apollo/client';

export const getMyInfo = gql`
  query {
    getMyInfo {
      id
      email
      firstName
      lastName
      dateJoined
      location {
        latitude
        longitude
      }
    }
  }
`;
