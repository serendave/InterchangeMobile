import { gql } from '@apollo/client';

export const getEvent = gql`
  query GetEvent($id: String!) {
    event(id: $id) {
      id
      name
      description
      dateCreated
      location {
        latitude
        longitude
      }
      creator {
        id
        firstName
        lastName
      }
      visitors {
        id
        email
        photo
        firstName
        lastName
      }
    }
  }
`;
