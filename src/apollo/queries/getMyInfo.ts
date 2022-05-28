import { gql } from '@apollo/client';

export const getMyInfo = gql`
  query {
    getMyInfo {
      id
      email
      firstName
      lastName
      dateJoined
      items {
        id
        name
        description
      }
    }
  }
`;
